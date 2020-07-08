import { User, UserAttrs } from '../../models/user';

import { signUp, signIn } from './mutations';
import { hello, currentUser } from './queries';

export interface UserData extends UserAttrs {
  data: {
    email: string;
    name: string;
    username: string;
    password: string;
    avatar: string;
  };
}
export const resolvers = {
  Query: {
    hello,
    currentUser,
  },
  Mutation: {
    signUp,
    signIn,
    singleUpload: async (root: any, { file }: any, ctx: any, info: any) => {
      console.log(ctx.req.body.variables);
      // const test = await ctx.req.body.variables;
      // console.log(Object.keys(ctx.req.headers));
      return ctx.req.body.variables.file;
    },
  },
  User: {
    __resolveReference: async (object: any) => {
      try {
        const userCollection = await User.findById(object.id);
        console.log(userCollection);
        return {
          success: true,
          data: userCollection,
          error: null,
        };
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
    },
  },
};
