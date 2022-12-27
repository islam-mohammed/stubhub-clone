import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../app";

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_SECRET = "any";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.getAuthCookie = async () => {
  const email = "test@test.com";
  const password = "newPa$$0rd";
  const firstName = "fname";
  const lastName = "lname";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
      firstName,
      lastName,
    })
    .expect(201);
  const cookie = response.get("Set-Cookie");
  return cookie;
};
