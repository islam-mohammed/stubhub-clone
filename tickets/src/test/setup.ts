import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { sign } from "jsonwebtoken";

declare global {
  var getAuthCookie: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
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
  const jwt = sign(
    {
      email: "test@test.com",
      password: "newPa$$0rd",
      firstName: "fname",
      lastName: "lname",
    },
    process.env.JWT_KEY!
  );

  const session = JSON.stringify({ jwt });
  return [`express:sess=${Buffer.from(session).toString("base64")}`];
};
