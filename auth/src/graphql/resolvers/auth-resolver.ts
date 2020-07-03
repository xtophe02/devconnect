import jwt from 'jsonwebtoken';
import { UserCreatedPublisher } from '../../events/user-created-publisher';
import { Readable } from 'stream';
import { User, UserAttrs } from '../../models/user';
import { Password } from '../../utils/password';
import { Cookies } from '../../utils/cookies';
import { natsWrapper } from '../../nats-wrapper';
import { storeUpload } from '../../utils/store-files';

interface UserJwtPayload {
  id: string;
  email: string;
}

// interface UserData extends UserAttrs {
//   data: UserAttrs;
// }
export interface Upload {
  stream: Readable;
  filename: string;
  mimetype: string;
  encoding: string;
}
interface teste {
  data: {
    email: string;
    name: string;
    username: string;
    password: string;
    avatar: Upload;
  };
}
const resolvers = {
  Query: {
    hello: (root: any, args: any, ctx: any) => {
      return 'Hello World';
    },
    currentUser: async (root: any, args: any, ctx: any) => {
      try {
        const payload = jwt.verify(
          ctx.req.headers.token.split('=')[1],
          process.env.JWT_KEY!
        ) as UserJwtPayload;
        return { ...payload };
      } catch (error) {
        console.log(error);
      }
      return;
    },
  },
  Mutation: {
    signUp: async (root: any, { data }: any, ctx: any) => {
      const { email, password, name, username, avatar } = data;
      const user = await User.findOne({ email });
      if (user) {
        //CREATE BAD REQUEST
        throw new Error('Email already in use');
      }
      try {
        const hashedPassword = await Password.toHash(password);
        const file = await storeUpload(avatar);
        const newUser = User.build({
          email,
          password: hashedPassword,
          name,
          username,
          avatar: file.cloudPath,
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

      //NO NEED TO PUBLISH A NEW USER
      // new UserCreatedPublisher(natsWrapper.client).publish({
      //   id: user.id,
      //   name: user.name,
      //   username: user.username,
      //   email: user.email,
      //   createdAt: user.createdAt.toISOString(),
      // });
    },
    signIn: async (root: any, { data }: any, ctx: any) => {
      //TODO inputs validation
      const { email, password } = data;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Email not correct');
      }
      const comparePassword = await Password.compare(user.password, password);
      if (!comparePassword) {
        throw new Error('Password not correct');
      }
      const userJwt = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY!
      );

      Cookies.setCookie(userJwt, ctx.res);
      //@ts-ignore
      console.log('user:', { ...user._doc });
      //@ts-ignore
      return { ...user._doc, id: user._id };
    },
    singleUpload: async (root: any, { file }: any, ctx: any, info: any) => {
      console.log(ctx.req.body.variables);
      // const test = await ctx.req.body.variables;

      // console.log(Object.keys(ctx.req.headers));
      return ctx.req.body.variables.file;
    },
  },
};

export { resolvers };
