import { sign } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import User, { IUser } from "../models/user.model";
import BadRequestError from "../errors/bad-request-error";
import { compare } from "bcrypt";
import NotFoundError from "../errors/not-found-error";

const sigunUp = async (user: IUser) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new BadRequestError("Email in use");
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
