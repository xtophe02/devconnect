import { User, UserAttrs } from "../../models/user";

import { signUp, signIn } from "./mutations";
import { hello, currentUser } from "./queries";
import { extname } from "path";
import mongoose from "mongoose";
import s3 from "../lib/s3";

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
    singleUpload: async (root: any, args: any, ctx: any, info: any) => {
      const file = ctx.req.body.variables.file;
      console.log(file);
      // const file = await storeUpload(ctx.req.body.file);
      const id = mongoose.Types.ObjectId().toHexString();
      const { createReadStream, filename, mimetype, encoding } = await file;

      const { Location } = await s3
        //@ts-ignore
        .upload({
          Body: createReadStream(),
          Key: `${id}${extname(filename)}`,
          ContentType: mimetype,
        })
        .promise();

      return { filename, mimetype, encoding, url: Location };
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
