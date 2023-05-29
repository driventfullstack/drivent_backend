import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import activitiesRepository from '@/repositories/activities-repository';
import { cannotBookActivityError } from '@/errors/cannot-book-activities-error';
import { activityConflictingTimeError } from '@/errors/activities-conflict-time-error';
import { forBiddenError } from '@/errors/forbidden-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getActivities() {
  const activities = await activitiesRepository.findActivities();
  if (!activities || activities.length === 0) {
    throw notFoundError();
  }
  return activities;
}

async function getActivitiesByDate(date: string) {
  const activities = await activitiesRepository.findActivities();
  if (activities.length === 0) {
    throw notFoundError();
  }

  function isDateInFormat(dateString: string) {
    const date = dayjs(dateString);
    return date.format('YYYY-MM-DD') === dateString;
  }

  if (!isDateInFormat(date)) throw badRequestError();

  return activitiesRepository.findActivitiesByDate(date);
}

async function getUserActivities(userId: number) {
  const activities = await activitiesRepository.findActivitiesByUserId(userId);

  if (!activities || activities.length === 0) throw notFoundError();

  return activities;
}

async function postActivities(userId: number, activityId: number) {
  if (!activityId) throw badRequestError();

  const activities = await activitiesRepository.findActivitiesById(activityId);

  if (!activities) throw notFoundError();

  const activitiesInscriptionsCount = await activitiesRepository.activitiesBookCount(activityId);

  if (activities.capacity <= activitiesInscriptionsCount) throw cannotBookActivityError();

  const userActivities = await activitiesRepository.findActivitiesByUserId(userId);

  if (userActivities.length > 0) {
    for (const i in userActivities) {
      if (
        activities.startAt.getDate() === userActivities[i].Activities.startAt.getDate() &&
        activities.startAt.getTime() < userActivities[i].Activities.endAt.getTime() &&
        activities.endAt.getTime() > userActivities[i].Activities.startAt.getTime()
      )
        throw activityConflictingTimeError();
    }
  }

  const activityInscription = await activitiesRepository.postActivities(userId, activityId);

  return activityInscription;
}

const activitiesService = {
  getActivities,
  getActivitiesByDate,
  getUserActivities,
  postActivities,
};

export default activitiesService;
