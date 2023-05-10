import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { CreateTicketParams, TicketTypeParams } from '@/protocols';

async function getTicketType(): Promise<TicketType[]> {
  const ticketTypes: TicketType[] = await ticketsRepository.findTicketTypes();
  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function getTicketByUserId(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticketData: CreateTicketParams = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketsRepository.createTicket(ticketData);

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

async function createTicketType(userId: number, ticketType: string): Promise<TicketType> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  if (ticketType === 'Online') {
    const ticketTypeData: TicketTypeParams = {
      name: 'Online',
      price: 0,
      isRemote: true,
      includesHotel: false,
    };

    const ticketType = await ticketsRepository.createTicketType(ticketTypeData);

    return ticketType;
  }

  if (ticketType === 'Presencial') {
    const ticketTypeData: TicketTypeParams = {
      name: 'Presencial',
      price: 0,
      isRemote: false,
      includesHotel: false,
    };

    const ticketType = await ticketsRepository.createTicketType(ticketTypeData);

    return ticketType;
  }
}

const ticketService = { getTicketType, getTicketByUserId, createTicket, createTicketType };

export default ticketService;
