import Joi from 'joi';
import { InputTicketBody, InputTypeTicketBody } from '@/protocols';

export const ticketsSchema = Joi.object<InputTicketBody>({
  ticketTypeId: Joi.number().required(),
});

export const typeTicketsSchema = Joi.object<InputTypeTicketBody>({
  ticketType: Joi.string().required(),
});
