import jwt from 'jsonwebtoken';
import { Roles } from '@cmdevconnect/common';
import { User } from '../../../models/user';
import { Password } from '../../../utils/password';
import { Cookies } from '../../../utils/cookies';

export const createUser = async (root: any, { data }: any, ctx: any) => {
  if (!ctx.user && data.email !== 'eng.christophe.moreira@gmail.com') {
    throw new Error('Needs to be Logged In to create user');
  }

  //DO TRANSACTIONS
  const user = await User.findOne({ email: data.email });
  if (user) {
    //CREATE BAD REQUEST
    throw new Error('User Email already exists');
  }
  if (ctx.user) {
    const owner = await User.findById(ctx.user.id);
    if (ctx.Roles === Roles.User) {
      console.log('ROLE:', owner.role);
      throw new Error('Needs to be Admin or Manager to create an User');
    }
    if (owner!.invitations <= 0) {
      throw new Error(`User ${ctx.user.email} cannot send more invitations`);
    }
    await owner!.updateOne({ $inc: { invitations: -1 } });
  }

  try {
    const hashedPassword = await Password.toHash(data.password);
    console.log(hashedPassword);
    const newUser = User.build({
      ...data,
      password: hashedPassword,
      owner: ctx.user ? ctx.user.email : undefined,
    });

    await newUser.save();

    const userJwt = jwt.sign(
      {
        id: ctx.user ? ctx.user.id : newUser.id,
        email: ctx.user ? ctx.user.email : newUser.email,
        role: ctx.user ? ctx.user.role : newUser.role,
      },
      process.env.JWT_KEY!
    );
    Cookies.setCookie(userJwt, ctx.res);

    return { data: newUser, success: true, error: null };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: {
        status: 500,
        message: e,
      },
    };
  }
};
