import { prisma } from '@/config';

async function findActivities() {
  return prisma.activities.findMany({
    include: {
      Auditory: true,
    },
  });
}

async function findActivitiesByDate(date: string) {
  console.log(date);
  return await prisma.activities.findMany({
    where: {
      startAt: {
        gte: new Date(date),
        lt: new Date(new Date(date).getTime() + 86400000),
      },
    },
  });
}
const activitiesRepository = { findActivities, findActivitiesByDate };

export default activitiesRepository;
