import { sign } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import User, { IUser } from "../models/user.model";
import { compare } from "bcrypt";
import { BadRequestError, NotFoundError } from "@stubhubdev/common";

const sigunUp = async (user: IUser) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new BadRequestError("Email in use", "email");
  }
  const newUser: UserDocument = await User.create(user);

  const jwt = sign(newUser.toObject(), process.env.JWT_SECRET!);

  return {
    jwt,
    user: newUser,
  };
};

const signIn = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new NotFoundError("User not found");
  }
  const isAuthenticated = await compare(password, existingUser.password);
  if (!isAuthenticated) {
    throw new BadRequestError("Invalid email or password");
  }

  const jwt = sign(existingUser.toObject(), process.env.JWT_SECRET!);

  return {
    jwt,
    user: existingUser,
  };
};

export { sigunUp, signIn };
