import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function seedRoadmap() {
  try {
    console.log('🌱 Starting roadmap seeding...');

    // Read roadmap seed data
    const seedDataPath = path.join(__dirname, '../../seed/roadmap-seed.json');
    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await prisma.metric.deleteMany();
    await prisma.artifact.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.roadmapDay.deleteMany();
    await prisma.roadmapWeek.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Existing data cleared');

    // Create roadmap weeks
    console.log('📅 Creating roadmap weeks...');
    for (const weekData of seedData.weeks) {
      const week = await prisma.roadmapWeek.create({
        data: {
          weekNumber: weekData.weekNumber,
          title: weekData.title,
          description: weekData.description,
        },
      });

      console.log(`✅ Created Week ${week.weekNumber}: ${week.title}`);

      // Create days for this week
      for (const dayData of weekData.days) {
        const day = await prisma.roadmapDay.create({
          data: {
            weekId: week.id,
            dayNumber: dayData.dayNumber,
            title: dayData.title,
            focusArea: dayData.focusArea,
            detailedActivities: dayData.detailedActivities,
            expectedOutput: dayData.expectedOutput,
          },
        });

        console.log(`  📝 Created Day ${day.dayNumber}: ${day.title}`);

        // Create activities for this day
        for (let i = 0; i < dayData.activities.length; i++) {
          const activityData = dayData.activities[i];
          await prisma.activity.create({
            data: {
              dayId: day.id,
              title: activityData.title,
              description: activityData.description,
              toolTags: activityData.toolTags,
              orderIndex: i + 1,
            },
          });

          console.log(`    ✅ Activity ${i + 1}: ${activityData.title}`);
        }
      }
    }

    console.log('🎉 Roadmap seeding completed successfully!');
    console.log(`📊 Created ${seedData.weeks.length} weeks with full daily breakdown`);

  } catch (error) {
    console.error('❌ Error seeding roadmap:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedRoadmap();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

export { seedRoadmap };