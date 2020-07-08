import jwt from 'jsonwebtoken';

import { User } from '../../../models/user';
import { Password } from '../../../utils/password';
import { Cookies } from '../../../utils/cookies';

export const signIn = async (root: any, { data }: any, ctx: any) => {
  //TODO inputs validation
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email/Password not correct');
  }
  const comparePassword = await Password.compare(user.password, password);
  if (!comparePassword) {
    throw new Error('Email/Password not correct');
  }
  const userJwt = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!
  );
  Cookies.setCookie(userJwt, ctx.res);

  //@ts-ignore
  return { ...user._doc, id: user._id };
};
