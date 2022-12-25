import { UserDocument } from "../models/user.model";
import User, { IUser } from "../models/user.model";
import BadRequestError from "../errors/bad-request-error";

const sigunUp = async (user: IUser) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new BadRequestError("Email in use");
  }
  const newUser: UserDocument = await User.create(user);
  return newUser;
};

export { sigunUp };
