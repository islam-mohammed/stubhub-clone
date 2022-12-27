import request from "supertest";
import app from "../../app";
describe("Signup Route Tests", () => {
  it("Should return a 201 on successful signup", async () => {
    return getAuthCookie();
  });
  it("Should return a 400 if the Email is used", async () => {
    await getAuthCookie();
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
    const cookie = await getAuthCookie();
    expect(cookie).toBeDefined();
  });
});

describe("Signin Route Tests", () => {
  it("Should return a 200 if on success sign in", async () => {
    await getAuthCookie();
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "newPa$$0rd",
      })
      .expect(200);
  });
  it("Should set cookie after success sign in", async () => {
    await getAuthCookie();
    const res = await request(app).post("/api/users/signin").send({
      email: "test@test.com",
      password: "newPa$$0rd",
    });
    expect(res.get("Set-Cookie")).toBeDefined();
  });
  it("Should return 404 code if the email is not exist", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "Iaaaanm7@",
      })
      .expect(404);
  });
  it("Should return 400 code if the email is not provided", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "",
        password: "Iaaaanm7@",
      })
      .expect(400);
  });
  it("Should return 400 code if the password is not provided", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "islam@mail.com",
        password: "",
      })
      .expect(400);
  });
});

describe("Sign Out Route Tests", () => {
  it("Should return a 200 status code on success sign out", async () => {
    const res = request(app).post("/api/users/signout").send().expect(200);
  });
  it("Should reset the cookie on success sign out", async () => {
    const cookie = await getAuthCookie();
    const req = await request(app)
      .post("/api/users/signout")
      .set("Cookie", cookie)
      .send();
    expect(req.get("Set-Cookie")[0]).toEqual(
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});

describe("Current User Route Tests", () => {
  it("Should respond with details about the current user", async () => {
    const authResponse = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        firstName: "first",
        lastName: "last",
        password: "Iaaaanm7@",
      })
      .expect(201);
    const cookie = authResponse.get("Set-Cookie");
    const response = await request(app)
      .get("/api/users/current")
      .set("Cookie", cookie)
      .send()
      .expect(200);
    expect(response.body.currentUser.email).toBeDefined();
    expect(response.body.currentUser.email).toEqual("test@test.com");
    expect(response.body.currentUser.firstName).toBeDefined();
    expect(response.body.currentUser.lastName).toBeDefined();
    expect(response.body.currentUser.id).toBeDefined();
    expect(response.body.currentUser.password).toBeUndefined();
  });
  it("Should respond with null if there is not authinticated", async () => {
    const response = await request(app)
      .get("/api/users/current")
      .send()
      .expect(401);
  });
});
