import { model, Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", UserSchema);

export default User;
