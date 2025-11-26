import request from 'supertest';
import app from '../src/server';
import { prisma, testUser, authToken } from './setup';

describe('Progress API Integration Tests', () => {
  let testActivity: any;
  let testDay: any;
  let testWeek: any;

  beforeAll(async () => {
    // Create test roadmap data
    testWeek = await prisma.roadmapWeek.create({
      data: {
        weekNumber: 1,
        title: 'Test Week',
        description: 'Test week for integration tests',
      },
    });

    testDay = await prisma.roadmapDay.create({
      data: {
        weekId: testWeek.id,
        dayNumber: 1,
        title: 'Test Day',
        focusArea: 'Test Focus',
        detailedActivities: 'Test activities',
        expectedOutput: 'Test output',
      },
    });

    testActivity = await prisma.activity.create({
      data: {
        dayId: testDay.id,
        title: 'Test Activity',
        description: 'Test description',
        toolTags: 'test,automation',
        orderIndex: 1,
      },
    });
  });

  afterAll(async () => {
    await prisma.activity.deleteMany();
    await prisma.roadmapDay.deleteMany();
    await prisma.roadmapWeek.deleteMany();
  });

  describe('POST /api/progress', () => {
    it('should create user progress for an activity', async () => {
      const progressData = {
        activityId: testActivity.id,
        status: 'DONE',
        notes: 'Test progress notes',
        evidenceUrl: 'https://example.com/proof',
      };

      const response = await request(app)
        .post('/api/progress')
        .set('Authorization', `Bearer ${authToken}`)
        .send(progressData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.status).toBe('DONE');
      expect(response.body.data.notes).toBe('Test progress notes');
      expect(response.body.data.completedAt).not.toBeNull();
    });

    it('should update existing progress', async () => {
      const progressData = {
        activityId: testActivity.id,
        status: 'IN_PROGRESS',
        notes: 'Updated progress notes',
      };

      const response = await request(app)
        .post('/api/progress')
        .set('Authorization', `Bearer ${authToken}`)
        .send(progressData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('IN_PROGRESS');
      expect(response.body.data.notes).toBe('Updated progress notes');
    });

    it('should require authentication', async () => {
      const progressData = {
        activityId: testActivity.id,
        status: 'DONE',
      };

      const response = await request(app)
        .post('/api/progress')
        .send(progressData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/progress', () => {
    beforeAll(async () => {
      // Create some test progress data
      await prisma.userProgress.create({
        data: {
          userId: testUser.id,
          activityId: testActivity.id,
          status: 'DONE',
          notes: 'Test progress',
          completedAt: new Date(),
        },
      });
    });

    it('should return user progress', async () => {
      const response = await request(app)
        .get('/api/progress')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should filter progress by status', async () => {
      const response = await request(app)
        .get('/api/progress?status=DONE')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      
      if (response.body.data.length > 0) {
        expect(response.body.data[0].status).toBe('DONE');
      }
    });
  });

  describe('GET /api/progress/export', () => {
    it('should export user progress as JSON', async () => {
      const response = await request(app)
        .get('/api/progress/export')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('progress');
      expect(response.body.data).toHaveProperty('exportedAt');
      expect(Array.isArray(response.body.data.progress)).toBe(true);
    });
  });
});