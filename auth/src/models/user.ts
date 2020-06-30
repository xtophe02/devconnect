import mongoose from 'mongoose';
import { Password } from '../utils/password';
// import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface UserAttrs {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
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
  password: string;
  createdAt: Date;
  avatar: string;
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
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
  // {
  //   toJSON: {
  //     transform(doc, ret) {
  //       ret.id = ret._id;
  //       delete ret._id;
  //       delete ret.password;
  //       delete ret.__v;
  //     },
  //   },
  // }
);
// userSchema.set('versionKey', 'version');
// userSchema.plugin(updateIfCurrentPlugin);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
