import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import Ticket from "../models/tickets";

const createNewTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", getAuthCookie()).send({
    title: "title",
    price: 15.5,
  });
};

describe("Post new ticket route test", () => {
  it("Should have a route handler to /api/tickets for post requests", async () => {
    const res = await request(app).post("/api/tickets").send();
    expect(res.statusCode).not.toEqual(404);
  });
  it("Should only accessed by a singned in user", async () => {
    await request(app).post("/api/tickets").send().expect(401);
  });

  it("should not return 401 if the user is signed in", async () => {
    const res = await request(app)
      .post("/api/tickets")
      .set("Cookie", getAuthCookie())
      .send();
    expect(res.status).not.toEqual(401);
  });

  it("Should return error if no title is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", getAuthCookie())
      .send({
        title: "",
        price: "15.5",
      })
      .expect(400);
  });
  it("Should return error if no title is not provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", getAuthCookie())
      .send({
        title: "title",
        price: "",
      })
      .expect(400);
  });

  it("Should return error if invalid price is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", getAuthCookie())
      .send({
        title: "title",
        price: "true",
      })
      .expect(400);
  });
  it("Should create a ticket if with valid input", async () => {
    let tickets = await Ticket.find();
    expect(tickets.length).toEqual(0);
    await request(app)
      .post("/api/tickets")
      .set("Cookie", getAuthCookie())
      .send({
        title: "title",
        price: 15.5,
      })
      .expect(201);
    tickets = await Ticket.find();
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual("title");
    expect(tickets[0].price).toEqual(15.5);
  });
});

describe("Show ticket route test", () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  it("Should return status of 404 if the is is not valid", async () => {
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });
  it("Should return a valid ticket if the parameter is correct", async () => {
    const res = await request(app)
      .post("/api/tickets")
      .set("Cookie", getAuthCookie())
      .send({
        title: "title",
        price: 15.5,
      })
      .expect(201);

    const ticketRes = await request(app)
      .get(`/api/tickets/${res.body.id}`)
      .send()
      .expect(200);
    expect(ticketRes.body.title).toEqual("title");
    expect(ticketRes.body.price).toEqual(15.5);
  });
});

describe("Show all tickets route test", () => {
  it("should return a list of tickets with 200 status code.", async () => {
    await createNewTicket();
    await createNewTicket();
    await createNewTicket();
    const res = await request(app).get("/api/tickets").send().expect(200);
    expect(res.body.length).toEqual(3);
  });
});

describe("Update ticket route test", () => {
  it("Should return 401 error if the user is not authinticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: "title", price: 15.5 })
      .expect(401);
  });
  it("Should return 404 error if the id is invalied", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", getAuthCookie())
      .send({ title: "title", price: 15.5 })
      .expect(404);
  });
  it("Should return 400 error if the title is not provided", async () => {
    const res = await createNewTicket().expect(201);
    await request(app)
      .put(`/api/tickets/${res.body.id}`)
      .set("Cookie", getAuthCookie())
      .send({
        price: 15.5,
      })
      .expect(400);
  });
  it("Should return 400 error if the price is not provided", async () => {
    const res = await createNewTicket().expect(201);
    await request(app)
      .put(`/api/tickets/${res.body.id}`)
      .set("Cookie", getAuthCookie())
      .send({
        title: "title",
      })
      .expect(400);
  });
  it("Should return 400 error if the price is not float", async () => {
    const res = await createNewTicket().expect(201);
    const ticket = res.body;
    await request(app)
      .put(`/api/tickets/${ticket.id}`)
      .set("Cookie", getAuthCookie())
      .send({
        title: "title",
        price: "true",
      })
      .expect(400);
  });
  it("Should return 401 error if the user try to update ticket belongs to other user", async () => {
    const res = await createNewTicket().expect(201);
    await request(app)
      .put(`/api/tickets/${res.body.id}`)
      .set("Cookie", getAuthCookie())
      .send({
        title: "title",
        price: 15.5,
      })
      .expect(401);
  });
  it("Should return 200 if the update success and to return the updated tiket", async () => {
    const res = await createNewTicket().expect(201);
    const updateRes = await request(app)
      .put(`/api/tickets/${res.body.id}`)
      .set("Cookie", getAuthCookie())
      .send({
        title: "second title",
        price: 20.5,
      })
      .expect(200);
    expect(updateRes.body.title).toEqual("second title");
    expect(updateRes.body.price).toEqual(20.5);
  });
});
