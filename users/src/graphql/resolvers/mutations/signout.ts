import jwt from 'jsonwebtoken';

import { User } from '../../../models/user';
import { Password } from '../../../utils/password';
import { Cookies } from '../../../utils/cookies';

export const signOut = async (root: any, args: any, ctx: any) => {
  //TODO inputs validation
  Cookies.removeTokenCookie(ctx.res);
  return true;
};
