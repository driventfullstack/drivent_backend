import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivities() {
  const activities = await activitiesRepository.findActivities();
  if (!activities || activities.length === 0) {
    throw notFoundError();
  }
  return activities;
}

const activitiesService = {
  getActivities,
};

export default activitiesService;
