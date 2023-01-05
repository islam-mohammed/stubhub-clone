import { model, Schema, Model, Document } from "mongoose";

export interface ITicket {
  title: string;
  price: number;
  userId: string;
}

export interface TicketDocument extends Document, ITicket {}

const TicketSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Ticket = model<TicketDocument>("Ticket", TicketSchema);

export default Ticket;
