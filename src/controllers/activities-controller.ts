import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const activities = await activitiesService.getActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function getActivitiesByDate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { date } = req.params;
  console.log(date);
  try {
    const activities = await activitiesService.getActivitiesByDate(date);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}
