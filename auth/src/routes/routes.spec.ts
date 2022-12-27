import { response } from "express";
import { expectCt } from "helmet";
import request from "supertest";
import app from "../../app";
describe("Signup Route", () => {
  it("Should return a 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        firstName: "first",
        lastName: "last",
        password: "Iaaaanm7@",
      })
      .expect(201);
  });
  it("Should return a 400 if the Email is used", async () => {
    await request(app).post("/api/users/signup").send({
      email: "test@test.com",
      firstName: "first",
      lastName: "last",
      password: "Iaaaanm7@",
    });
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        firstName: "first",
        lastName: "last",
        password: "Iaaaanm7@",
      })
      .expect(400);
  });
  it("Should return a 400 if email is invalid", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test",
        firstName: "first",
        lastName: "last",
        password: "Iaaaanm7@",
      })
      .expect(400);
  });
  it("Should return a 400 if password in invalid", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@email.com",
        firstName: "first",
        lastName: "last",
        password: "Iaaaanm7",
      })
      .expect(400);
  });
  it("Should return a 400 if the First Name is missing", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@email.com",
        firstName: "",
        lastName: "last",
        password: "Iaaaanm7",
      })
      .expect(400);
  });
  it("Should return a 400 if the Last Name is missing", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@email.com",
        firstName: "",
        lastName: "last",
        password: "Iaaaanm7",
      })
      .expect(400);
  });
  it("should set a cookie after successful signup", async () => {
    const res = await request(app).post("/api/users/signup").send({
      email: "new@email.com",
      firstName: "Islam",
      lastName: "last",
      password: "Iaaaanm7A@",
    });
    expect(res.get("Set-Cookie")).toBeDefined();
  });
});
