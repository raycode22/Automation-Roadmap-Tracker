import express from 'express';
import { prisma } from '@/server';
import { asyncHandler } from '@/middleware/errorHandler';
import { authenticate, AuthenticatedRequest } from '@/middleware/auth';

const router = express.Router();

// @route   GET /api/roadmap/weeks
// @desc    Get all roadmap weeks with nested days and activities
// @access  Private
router.get('/weeks', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const weeks = await prisma.roadmapWeek.findMany({
    include: {
      days: {
        include: {
          activities: {
            orderBy: { orderIndex: 'asc' },
          },
        },
        orderBy: { dayNumber: 'asc' },
      },
    },
    orderBy: { weekNumber: 'asc' },
  });

  res.json({
    success: true,
    data: weeks,
  });
}));

// @route   GET /api/roadmap/weeks/:id
// @desc    Get specific week with full details
// @access  Private
router.get('/weeks/:id', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const week = await prisma.roadmapWeek.findUnique({
    where: { id: req.params.id },
    include: {
      days: {
        include: {
          activities: {
            orderBy: { orderIndex: 'asc' },
          },
        },
        orderBy: { dayNumber: 'asc' },
      },
    },
  });

  if (!week) {
    return res.status(404).json({
      success: false,
      error: 'Week not found',
    });
  }

  res.json({
    success: true,
    data: week,
  });
}));

// @route   GET /api/roadmap/days/:id
// @desc    Get specific day with activities and user progress
// @access  Private
router.get('/days/:id', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const day = await prisma.roadmapDay.findUnique({
    where: { id: req.params.id },
    include: {
      week: true,
      activities: {
        orderBy: { orderIndex: 'asc' },
      },
    },
  });

  if (!day) {
    return res.status(404).json({
      success: false,
      error: 'Day not found',
    });
  }

  // Get user progress for activities in this day
  const activities = await prisma.activity.findMany({
    where: { dayId: req.params.id },
    include: {
      progress: {
        where: { userId: req.user!.id },
      },
    },
    orderBy: { orderIndex: 'asc' },
  });

  res.json({
    success: true,
    data: {
      ...day,
      activities,
    },
  });
}));

// @route   GET /api/roadmap/activities
// @desc    Get all activities with optional week/day filter
// @access  Private
router.get('/activities', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { week, day } = req.query;

  const activities = await prisma.activity.findMany({
    where: {
      ...(week && {
        day: {
          week: {
            weekNumber: parseInt(week as string),
          },
        },
      }),
      ...(day && {
        dayId: day as string,
      }),
    },
    include: {
      day: {
        include: {
          week: true,
        },
      },
    },
    orderBy: [
      { day: { week: { weekNumber: 'asc' } } },
      { day: { dayNumber: 'asc' } },
      { orderIndex: 'asc' },
    ],
  });

  res.json({
    success: true,
    data: activities,
  });
}));

// @route   GET /api/roadmap/progress/:activityId
// @desc    Get user progress for specific activity
// @access  Private
router.get('/progress/:activityId', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const progress = await prisma.userProgress.findUnique({
    where: {
      userId_activityId: {
        userId: req.user!.id,
        activityId: req.params.activityId,
      },
    },
  });

  res.json({
    success: true,
    data: progress,
  });
}));

export { router as roadmapRoutes };