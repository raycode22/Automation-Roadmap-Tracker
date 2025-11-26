import express from 'express';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import { prisma } from '@/server';
import { asyncHandler } from '@/middleware/errorHandler';
import { authenticate, AuthenticatedRequest } from '@/middleware/auth';

const router = express.Router();

// @route   GET /api/dashboard
// @desc    Get dashboard statistics and analytics
// @access  Private
router.get('/', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;

  // Get overall completion statistics
  const totalActivities = await prisma.activity.count();
  const completedActivities = await prisma.userProgress.count({
    where: {
      userId,
      status: 'DONE',
    },
  });
  const inProgressActivities = await prisma.userProgress.count({
    where: {
      userId,
      status: 'IN_PROGRESS',
    },
  });

  const overallCompletionPercent = totalActivities > 0 
    ? Math.round((completedActivities / totalActivities) * 100)
    : 0;

  // Get weekly completion statistics
  const weeklyStats = await prisma.roadmapWeek.findMany({
    include: {
      days: {
        include: {
          activities: {
            include: {
              progress: {
                where: { userId },
              },
            },
          },
        },
      },
    },
    orderBy: { weekNumber: 'asc' },
  });

  const weeklyProgress = weeklyStats.map(week => {
    const totalActivitiesInWeek = week.days.reduce((acc, day) => acc + day.activities.length, 0);
    const completedActivitiesInWeek = week.days.reduce((acc, day) => 
      acc + day.activities.filter(activity => 
        activity.progress.length > 0 && activity.progress[0].status === 'DONE'
      ).length, 0
    );

    return {
      weekNumber: week.weekNumber,
      title: week.title,
      totalActivities: totalActivitiesInWeek,
      completedActivities: completedActivitiesInWeek,
      completionPercent: totalActivitiesInWeek > 0 
        ? Math.round((completedActivitiesInWeek / totalActivitiesInWeek) * 100)
        : 0,
    };
  });

  // Get daily completion trend (last 30 days)
  const thirtyDaysAgo = subDays(new Date(), 30);
  const progressData = await prisma.userProgress.findMany({
    where: {
      userId,
      status: 'DONE',
      completedAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      completedAt: true,
    },
  });

  const dailyProgress = [];
  for (let i = 0; i < 30; i++) {
    const date = subDays(new Date(), i);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const completionsOnDay = progressData.filter(progress => 
      progress.completedAt && 
      progress.completedAt >= dayStart && 
      progress.completedAt <= dayEnd
    ).length;

    dailyProgress.unshift({
      date: date.toISOString().split('T')[0],
      completions: completionsOnDay,
    });
  }

  // Get tool/category breakdown
  const activitiesWithProgress = await prisma.activity.findMany({
    include: {
      progress: {
        where: {
          userId,
          status: 'DONE',
        },
      },
    },
  });

  const toolBreakdown = {};
  activitiesWithProgress.forEach(activity => {
    if (activity.progress.length > 0) {
      const toolTags = activity.toolTags.split(',').map(tag => tag.trim());
      toolTags.forEach(tool => {
        if (!toolBreakdown[tool]) {
          toolBreakdown[tool] = 0;
        }
        toolBreakdown[tool]++;
      });
    }
  });

  const toolStats = Object.entries(toolBreakdown).map(([tool, count]) => ({
    tool,
    count: count as number,
  }));

  // Get current streak calculation
  const sortedProgress = await prisma.userProgress.findMany({
    where: {
      userId,
      status: 'DONE',
      completedAt: {
        not: null,
      },
    },
    select: {
      completedAt: true,
    },
    orderBy: {
      completedAt: 'desc',
    },
  });

  let currentStreak = 0;
  let lastCompletionDate: Date | null = null;

  for (const progress of sortedProgress) {
    if (!progress.completedAt) continue;

    if (!lastCompletionDate) {
      currentStreak = 1;
      lastCompletionDate = progress.completedAt;
      continue;
    }

    const daysDiff = Math.abs(
      Math.floor((lastCompletionDate.getTime() - progress.completedAt.getTime()) / (1000 * 60 * 60 * 24))
    );

    if (daysDiff <= 1) {
      currentStreak++;
      lastCompletionDate = progress.completedAt;
    } else {
      break;
    }
  }

  // Get recent activities
  const recentProgress = await prisma.userProgress.findMany({
    where: {
      userId,
    },
    include: {
      activity: {
        include: {
          day: {
            include: {
              week: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 10,
  });

  const dashboardData = {
    overview: {
      totalActivities,
      completedActivities,
      inProgressActivities,
      overallCompletionPercent,
      currentStreak,
    },
    weeklyProgress,
    dailyProgress,
    toolStats,
    recentProgress: recentProgress.map(progress => ({
      id: progress.id,
      status: progress.status,
      notes: progress.notes,
      evidenceUrl: progress.evidenceUrl,
      completedAt: progress.completedAt,
      updatedAt: progress.updatedAt,
      activity: {
        id: progress.activity.id,
        title: progress.activity.title,
        toolTags: progress.activity.toolTags,
        day: {
          dayNumber: progress.activity.day.dayNumber,
          focusArea: progress.activity.day.focusArea,
          week: {
            weekNumber: progress.activity.day.week.weekNumber,
            title: progress.activity.day.week.title,
          },
        },
      },
    })),
  };

  res.json({
    success: true,
    data: dashboardData,
  });
}));

// @route   GET /api/dashboard/streak
// @desc    Get user's current streak and streak history
// @access  Private
router.get('/streak', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;

  const progressData = await prisma.userProgress.findMany({
    where: {
      userId,
      status: 'DONE',
      completedAt: {
        not: null,
      },
    },
    select: {
      completedAt: true,
    },
    orderBy: {
      completedAt: 'asc',
    },
  });

  let currentStreak = 0;
  let longestStreak = 0;
  let streakDays = [];
  let tempStreak = 1;

  // Calculate streaks
  for (let i = 1; i < progressData.length; i++) {
    const currentDate = progressData[i].completedAt!;
    const previousDate = progressData[i - 1].completedAt!;
    
    const daysDiff = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      tempStreak++;
    } else {
      streakDays.push(tempStreak);
      tempStreak = 1;
    }
  }
  
  if (progressData.length > 0) {
    streakDays.push(tempStreak);
  }

  if (streakDays.length > 0) {
    currentStreak = 1; // Start with today if there was a completion today
    streakDays.sort((a, b) => b - a);
    longestStreak = streakDays[0];
    
    // Check if current streak is still active
    const lastCompletion = progressData[progressData.length - 1];
    if (lastCompletion) {
      const daysSinceLastCompletion = Math.floor(
        (new Date().getTime() - lastCompletion.completedAt!.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysSinceLastCompletion <= 1) {
        currentStreak = tempStreak;
      } else {
        currentStreak = 0;
      }
    }
  }

  res.json({
    success: true,
    data: {
      currentStreak,
      longestStreak,
      totalCompletionDays: progressData.length,
      streakDays: streakDays.sort((a, b) => b - a).slice(0, 10), // Top 10 streaks
    },
  });
}));

export { router as dashboardRoutes };