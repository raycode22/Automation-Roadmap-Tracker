import express from 'express';
import { z } from 'zod';
import { prisma } from '@/server';
import { asyncHandler } from '@/middleware/errorHandler';
import { authenticate, AuthenticatedRequest } from '@/middleware/auth';

const router = express.Router();

// Validation schemas
const progressSchema = z.object({
  activityId: z.string(),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'DONE']),
  notes: z.string().optional(),
  evidenceUrl: z.string().url().optional(),
});

// @route   POST /api/progress
// @desc    Create or update user progress
// @access  Private
router.post('/', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const validatedData = progressSchema.parse(req.body);
  
  const { activityId, status, notes, evidenceUrl } = validatedData;

  // Verify activity exists
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      day: true,
    },
  });

  if (!activity) {
    return res.status(404).json({
      success: false,
      error: 'Activity not found',
    });
  }

  const completedAt = status === 'DONE' ? new Date() : null;

  // Upsert progress
  const progress = await prisma.userProgress.upsert({
    where: {
      userId_activityId: {
        userId: req.user!.id,
        activityId,
      },
    },
    update: {
      status,
      notes: notes || null,
      evidenceUrl: evidenceUrl || null,
      completedAt,
    },
    create: {
      userId: req.user!.id,
      activityId,
      status,
      notes: notes || null,
      evidenceUrl: evidenceUrl || null,
      completedAt,
    },
    include: {
      activity: true,
    },
  });

  res.json({
    success: true,
    data: progress,
  });
}));

// @route   GET /api/progress
// @desc    Get user progress with optional filters
// @access  Private
router.get('/', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { week, day, status } = req.query;

  const progress = await prisma.userProgress.findMany({
    where: {
      userId: req.user!.id,
      ...(status && { status: status as any }),
      ...(day && {
        activity: {
          dayId: day as string,
        },
      }),
      ...(week && {
        activity: {
          day: {
            weekId: {
              equals: week as string,
            },
          },
        },
      }),
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
    orderBy: [
      { activity: { day: { week: { weekNumber: 'asc' } } } },
      { activity: { day: { dayNumber: 'asc' } } },
      { activity: { orderIndex: 'asc' } },
    ],
  });

  res.json({
    success: true,
    data: progress,
  });
}));

// @route   GET /api/progress/user/:userId
// @desc    Get user progress (for admin/other users)
// @access  Private
router.get('/user/:userId', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  // Only allow users to see their own progress or if they're an admin
  if (req.params.userId !== req.user!.id) {
    // TODO: Add admin role check when implementing role-based access
    return res.status(403).json({
      success: false,
      error: 'Not authorized to view this user\'s progress',
    });
  }

  const progress = await prisma.userProgress.findMany({
    where: {
      userId: req.params.userId,
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
    orderBy: [
      { activity: { day: { week: { weekNumber: 'asc' } } } },
      { activity: { day: { dayNumber: 'asc' } } },
      { activity: { orderIndex: 'asc' } },
    ],
  });

  res.json({
    success: true,
    data: progress,
  });
}));

// @route   DELETE /api/progress/:activityId
// @desc    Delete user progress for an activity
// @access  Private
router.delete('/:activityId', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  await prisma.userProgress.delete({
    where: {
      userId_activityId: {
        userId: req.user!.id,
        activityId: req.params.activityId,
      },
    },
  });

  res.json({
    success: true,
    message: 'Progress deleted successfully',
  });
}));

// @route   GET /api/progress/export
// @desc    Export user progress as JSON
// @access  Private
router.get('/export', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const progress = await prisma.userProgress.findMany({
    where: {
      userId: req.user!.id,
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
    orderBy: [
      { activity: { day: { week: { weekNumber: 'asc' } } } },
      { activity: { day: { dayNumber: 'asc' } } },
      { activity: { orderIndex: 'asc' } },
    ],
  });

  const exportData = {
    user: req.user,
    progress: progress.map(p => ({
      id: p.id,
      status: p.status,
      notes: p.notes,
      evidenceUrl: p.evidenceUrl,
      completedAt: p.completedAt,
      activity: {
        id: p.activity.id,
        title: p.activity.title,
        toolTags: p.activity.toolTags,
        day: {
          dayNumber: p.activity.day.dayNumber,
          focusArea: p.activity.day.focusArea,
          week: {
            weekNumber: p.activity.day.week.weekNumber,
            title: p.activity.day.week.title,
          },
        },
      },
    })),
    exportedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: exportData,
  });
}));

// @route   POST /api/progress/import
// @desc    Import user progress from JSON
// @access  Private
router.post('/import', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { progress: progressData } = req.body;

  if (!Array.isArray(progressData)) {
    return res.status(400).json({
      success: false,
      error: 'Progress data must be an array',
    });
  }

  const importedProgress = [];

  for (const item of progressData) {
    try {
      // Find the activity by matching title and other criteria
      const activity = await prisma.activity.findFirst({
        where: {
          title: item.activity.title,
          toolTags: item.activity.toolTags,
        },
        include: {
          day: true,
        },
      });

      if (!activity) continue;

      // Create or update progress
      const progress = await prisma.userProgress.upsert({
        where: {
          userId_activityId: {
            userId: req.user!.id,
            activityId: activity.id,
          },
        },
        update: {
          status: item.status,
          notes: item.notes || null,
          evidenceUrl: item.evidenceUrl || null,
          completedAt: item.completedAt ? new Date(item.completedAt) : null,
        },
        create: {
          userId: req.user!.id,
          activityId: activity.id,
          status: item.status,
          notes: item.notes || null,
          evidenceUrl: item.evidenceUrl || null,
          completedAt: item.completedAt ? new Date(item.completedAt) : null,
        },
      });

      importedProgress.push(progress);
    } catch (error) {
      console.error('Error importing progress item:', error);
    }
  }

  res.json({
    success: true,
    data: {
      imported: importedProgress.length,
      progress: importedProgress,
    },
  });
}));

export { router as progressRoutes };