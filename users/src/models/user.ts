import mongoose from "mongoose";

import { Password } from "../utils/password";

export interface UserAttrs {
  email: string;
  password: string;
  role: string;
  owner: string;
  invitations: number;
}
//methods user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//prop user Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  owner: string;
  invitations: number;
}
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      default: "eng.christophe.moreira@gmail.com",
    },
    invitations: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
