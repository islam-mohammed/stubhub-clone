import request from "supertest";
import app from "../../app";

describe("Post new ticket test", () => {
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
  it("Should return status code of 201 if the tickets is added", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", getAuthCookie())
      .send({
        title: "title",
        price: 15.5,
      })
      .expect(201);
  });
});
