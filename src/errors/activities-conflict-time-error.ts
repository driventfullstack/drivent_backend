import { ApplicationError } from '@/protocols';

export function activityConflictingTimeError(): ApplicationError {
  return {
    name: 'ActivityConflictingTimeError',
    message: 'Cannot book this activity due to conflictng time with another one!',
  };
}
