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

async function createTicketType(userId: number, ticketType: string, hotel: string): Promise<TicketType> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  try {
    if (ticketType === 'Online') {
      const ticketTypeData: TicketTypeParams = {
        name: 'online',
        price: 100,
        isRemote: true,
        includesHotel: false,
      };

      const ticketTypeCreated = await ticketsRepository.createTicketType(ticketTypeData);
      return ticketTypeCreated;
    }

    if (ticketType === 'Presencial' && hotel === 'PresencialcomHotel') {
      const ticketTypeData: TicketTypeParams = {
        name: 'presencial',
        price: 650,
        isRemote: false,
        includesHotel: true,
      };

      const ticketTypeCreated = await ticketsRepository.createTicketType(ticketTypeData);
      return ticketTypeCreated;
    }

    if (ticketType === 'Presencial' && hotel === 'PresencialsemHotel') {
      const ticketTypeData: TicketTypeParams = {
        name: 'presencial',
        price: 250,
        isRemote: false,
        includesHotel: false,
      };

      const ticketTypeCreated = await ticketsRepository.createTicketType(ticketTypeData);
      return ticketTypeCreated;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const ticketService = { getTicketType, getTicketByUserId, createTicket, createTicketType };

export default ticketService;
