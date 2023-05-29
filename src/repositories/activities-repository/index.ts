import { prisma } from '@/config';

async function findActivities() {
  return prisma.activities.findMany({
    include: {
      Auditory: true,
    },
  });
}

async function findActivitiesByDate(date: string) {
  return await prisma.activities.findMany({
    where: {
      startAt: {
        gte: new Date(date),
        lt: new Date(new Date(date).getTime() + 86400000),
      },
    },
    include: {
      Auditory: true,
      Inscription: true,
    },
  });
}

async function findActivitiesById(activityId: number) {
  return prisma.activities.findFirst({
    where: {
      id: activityId,
    },
  });
}

async function findActivitiesByUserId(userId: number) {
  return prisma.inscription.findMany({
    where: {
      userId,
    },
    include: {
      Activities: true,
    },
  });
}

async function activitiesBookCount(activityId: number) {
  return prisma.inscription.count({
    where: {
      activityId,
    },
  });
}

async function postActivities(userId: number, activityId: number) {
  return prisma.inscription.create({
    data: {
      userId,
      activityId,
    },
  });
}

const activitiesRepository = {
  findActivities,
  findActivitiesByDate,
  postActivities,
  findActivitiesById,
  findActivitiesByUserId,
  activitiesBookCount,
};

export default activitiesRepository;
