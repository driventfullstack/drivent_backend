import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import activitiesRepository from '@/repositories/activities-repository';

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

const activitiesService = {
  getActivities,
  getActivitiesByDate,
};

export default activitiesService;
