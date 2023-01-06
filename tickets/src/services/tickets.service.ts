import Ticket, { TicketDocument } from "./../models/tickets";
import { ITicket } from "../models/tickets";
import {
  DatabaseConnectionError,
  NotFoundError,
  UnauthorizedError,
} from "@stubhubdev/common";
const createTicket = async (ticket: ITicket) => {
  try {
    const newTicket: TicketDocument = await Ticket.create(ticket);
    return newTicket;
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};
const updateTicket = async (
  ticket: ITicket,
  userId: string,
  ticketId: string
) => {
  const existTicket = await Ticket.findById(ticketId);
  if (!existTicket)
    throw new NotFoundError(`A ticket with id: ${ticketId} dosn't exist.`);
  if (existTicket.userId !== userId) throw new UnauthorizedError();
  existTicket.title = ticket.title;
  existTicket.price = ticket.price;
  const updatedTicket = await existTicket.save();
  return updatedTicket;
};

const getTicketById = async (id: string) => {
  const ticket = await Ticket.findOne({ id });
  if (!ticket)
    throw new NotFoundError(`A ticket with id: ${id} doesn't exist.`);
  return ticket;
};

const getAllTickets = () => {
  try {
    return Ticket.find({});
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

export { createTicket, getTicketById, getAllTickets, updateTicket };
