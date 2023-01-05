import request from "supertest";
import app from "../../app";
import Ticket from "../models/tickets";

describe("Post new ticket route test", () => {
  it("Should have a route handler to /api/tickets for post requests", async () => {
    const res = await request(app).post("/api/tickets").send({});
    expect(res.statusCode).not.toEqual(404);
  });
  it("Should only accessed by a singned in user", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
  });

  it("should not return 401 if the user is signed in", async () => {
    const res = await request(app)
      .post("/api/tickets")
      .set("Cookie", getAuthCookie())
      .send({});
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
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    await request(app)
      .post("/api/tickets")
      .set("Cookie", getAuthCookie())
      .send({
        title: "title",
        price: 15.5,
      })
      .expect(201);
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual("title");
    expect(tickets[0].price).toEqual(15.5);
  });
});

describe("Show ticket route test", () => {
  it("Should return status of 404 if the is is not valid", async () => {
    await request(app).get("/api/tickets/notexistticket").send({}).expect(404);
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
      .send({})
      .expect(200);
    expect(ticketRes.body.title).toEqual("title");
    expect(ticketRes.body.price).toEqual(15.5);
  });
});
