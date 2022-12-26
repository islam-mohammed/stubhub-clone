import { sign } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import User, { IUser } from "../models/user.model";
import BadRequestError from "../errors/bad-request-error";

const sigunUp = async (user: IUser) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new BadRequestError("Email in use");
  }
  const newUser: UserDocument = await User.create(user);
  const jwtUser = sign(
    {
      id: newUser.id,
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
    },
    process.env.JWT_SECRET!
  );

  return jwtUser;
};

export { sigunUp };
