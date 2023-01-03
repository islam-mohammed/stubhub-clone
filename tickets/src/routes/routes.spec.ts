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

  it("Should return status code of 200 if the tickets is added", () => {});
  it("Should return error if invalid title is provided", () => {});
  it("Should return error if invalid price is provided", () => {});
});
``;
