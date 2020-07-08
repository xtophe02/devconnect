import jwt from 'jsonwebtoken';

import { User } from '../../../models/user';
import { Password } from '../../../utils/password';
import { Cookies } from '../../../utils/cookies';

export const signUp = async (root: any, { data }: any, ctx: any) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (user) {
    //CREATE BAD REQUEST
    throw new Error('User Email already exists');
  }
  try {
    const hashedPassword = await Password.toHash(password);

    const newUser = User.build({
      ...data,
      password: hashedPassword,
    });
    //THE SAVE AND PUBLIHSHER SHOULD BE DONE IN MONGODB TRANSACTION
    await newUser.save();

    const userJwt = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_KEY!
    );
    Cookies.setCookie(userJwt, ctx.res);

    //@ts-ignore
    return { ...newUser._doc, id: newUser._id };
  } catch (error) {
    console.error(error);
    throw new Error('something went wrong');
  }
};
