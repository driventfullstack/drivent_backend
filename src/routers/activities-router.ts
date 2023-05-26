import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivities, getActivitiesByDate } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getActivities).get('/:date', getActivitiesByDate);

export { activitiesRouter };
