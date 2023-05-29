import { ApplicationError } from '@/protocols';

export function cannotBookActivityError(): ApplicationError {
  return {
    name: 'CannotBookActivityError',
    message: 'Cannot book this activity. Overcapacity!',
  };
}
