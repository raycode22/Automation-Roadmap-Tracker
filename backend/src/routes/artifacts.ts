import express from 'express';
import multer from 'multer';
import path from 'path';
import { z } from 'zod';
import { prisma } from '@/server';
import { asyncHandler } from '@/middleware/errorHandler';
import { authenticate, AuthenticatedRequest } from '@/middleware/auth';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|txt|md|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only allow image, PDF, text, and document files'));
    }
  },
});

// Validation schemas
const artifactSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  link: z.string().url().optional(),
  dayId: z.string().optional(),
});

// @route   POST /api/artifacts
// @desc    Create a new artifact (with optional file upload)
// @access  Private
router.post('/', 
  authenticate,
  upload.single('file'),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    if (req.file) {
      req.body.fileRef = `/uploads/${req.file.filename}`;
    }

    const validatedData = artifactSchema.parse(req.body);
    const { title, description, link, dayId } = validatedData;
    const fileRef = (req as any).fileRef;

    const artifact = await prisma.artifact.create({
      data: {
        userId: req.user!.id,
        dayId: dayId || null,
        title,
        description: description || null,
        link: link || null,
        fileRef: fileRef || null,
      },
      include: {
        day: true,
      },
    });

    res.status(201).json({
      success: true,
      data: artifact,
    });
  })
);

// @route   GET /api/artifacts
// @desc    Get user's artifacts with optional filters
// @access  Private
router.get('/', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const { day, visibility } = req.query;

  const artifacts = await prisma.artifact.findMany({
    where: {
      userId: req.user!.id,
      ...(day && { dayId: day as string }),
      ...(visibility && { visibility: visibility as string }),
    },
    include: {
      day: {
        include: {
          week: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({
    success: true,
    data: artifacts,
  });
}));

// @route   GET /api/artifacts/:id
// @desc    Get specific artifact
// @access  Private
router.get('/:id', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const artifact = await prisma.artifact.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
    include: {
      day: {
        include: {
          week: true,
        },
      },
    },
  });

  if (!artifact) {
    return res.status(404).json({
      success: false,
      error: 'Artifact not found',
    });
  }

  res.json({
    success: true,
    data: artifact,
  });
}));

// @route   PUT /api/artifacts/:id
// @desc    Update artifact
// @access  Private
router.put('/:id',
  authenticate,
  upload.single('file'),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    if (req.file) {
      req.body.fileRef = `/uploads/${req.file.filename}`;
    }

    const validatedData = artifactSchema.parse(req.body);
    const { title, description, link, dayId } = validatedData;
    const fileRef = (req as any).fileRef;

    // Check if artifact exists and belongs to user
    const existingArtifact = await prisma.artifact.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
    });

    if (!existingArtifact) {
      return res.status(404).json({
        success: false,
        error: 'Artifact not found',
      });
    }

    const artifact = await prisma.artifact.update({
      where: { id: req.params.id },
      data: {
        title,
        description: description || null,
        link: link || null,
        dayId: dayId || null,
        ...(fileRef && { fileRef }),
      },
      include: {
        day: true,
      },
    });

    res.json({
      success: true,
      data: artifact,
    });
  })
);

// @route   DELETE /api/artifacts/:id
// @desc    Delete artifact
// @access  Private
router.delete('/:id', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  // Check if artifact exists and belongs to user
  const existingArtifact = await prisma.artifact.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!existingArtifact) {
    return res.status(404).json({
      success: false,
      error: 'Artifact not found',
    });
  }

  await prisma.artifact.delete({
    where: { id: req.params.id },
  });

  res.json({
    success: true,
    message: 'Artifact deleted successfully',
  });
}));

// @route   GET /api/artifacts/public
// @desc    Get public artifacts (for showcase)
// @access  Public
router.get('/public', asyncHandler(async (req, res) => {
  const artifacts = await prisma.artifact.findMany({
    where: {
      visibility: 'public',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      day: {
        include: {
          week: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 50, // Limit public artifacts
  });

  res.json({
    success: true,
    data: artifacts,
  });
}));

// @route   POST /api/artifacts/:id/toggle-visibility
// @desc    Toggle artifact visibility between public and private
// @access  Private
router.post('/:id/toggle-visibility', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const artifact = await prisma.artifact.findFirst({
    where: {
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!artifact) {
    return res.status(404).json({
      success: false,
      error: 'Artifact not found',
    });
  }

  const updatedArtifact = await prisma.artifact.update({
    where: { id: req.params.id },
    data: {
      visibility: artifact.visibility === 'public' ? 'private' : 'public',
    },
  });

  res.json({
    success: true,
    data: updatedArtifact,
  });
}));

export { router as artifactRoutes };