import { model, Schema, Model, Document } from "mongoose";
import { hash, genSalt } from "bcrypt";

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserDocument extends Document, IUser {}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (Done) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashed = await hash(this.get("password"), salt);
    this.set("password", hashed);
  }
  Done();
});

const User = model<UserDocument>("User", UserSchema);

export default User;
