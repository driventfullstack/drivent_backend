import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  getActivities,
  getActivitiesByDate,
  getUserActivities,
  postActivities,
} from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivities)
  .get('/user', getUserActivities)
  .get('/:date', getActivitiesByDate)
  .post('/', postActivities);

export { activitiesRouter };
