import Ticket, { TicketDocument } from "./../models/tickets";
import { ITicket } from "../models/tickets";
import { DatabaseConnectionError, NotFoundError } from "@stubhubdev/common";
const createTicket = async (ticket: ITicket) => {
  try {
    const newTicket: TicketDocument = await Ticket.create(ticket);
    return newTicket;
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

const getTicketById = async (id: string) => {
  const ticket = await Ticket.findOne({ id });
  if (!ticket) throw new NotFoundError();
  return ticket;
};

export { createTicket, getTicketById };
