import mongoose from 'mongoose';

export interface UserAttrs {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
}
//methods user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//prop user Document has
interface UserDoc extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  createdAt: Date;
}
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  }
  // {
  //   toJSON: {
  //     transform(doc, ret) {
  //       ret.id = ret._id;
  //       delete ret._id;
  //       delete ret.__v;
  //     },
  //   },
  // }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
