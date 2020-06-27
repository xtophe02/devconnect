import jwt from 'jsonwebtoken';
import { UserCreatedPublisher } from '../../events/user-created-publisher';

import { User } from '../../models/user';
import { Password } from '../../utils/password';
import { Cookies } from '../../utils/cookies';
import { natsWrapper } from '../../nats-wrapper';

interface UserPayload {
  id: string;
  email: string;
}

const resolvers = {
  Query: {
    hello: (root: any, args: any, ctx: any) => {
      return 'Hello World';
    },
    currentUser: async (root: any, { data }: any, ctx: any) => {
      // if (!req.session?.jwt) {
      //   return;
      // }
      try {
        const payload = jwt.verify(
          ctx.req.headers.token.split('=')[1],
          process.env.JWT_KEY!
        ) as UserPayload;
        console.log(payload);
        return { ...payload };
      } catch (error) {}
      return { email: 'teste' };
    },
  },
  Mutation: {
    signUp: async (root: any, { data }: any, ctx: any) => {
      //TODO inputs validation
      const { email, password, name, username } = data;
      const hashedPassword = await Password.toHash(password);
      const user = User.build({
        email,
        password: hashedPassword,
        name,
        username,
      });
      //THE SAVE AND PUBLIHSHER SHOULD BE DONE IN MONGODB TRANSACTION
      await user.save();

      //NO NEED TO PUBLISH A NEW USER
      // new UserCreatedPublisher(natsWrapper.client).publish({
      //   id: user.id,
      //   name: user.name,
      //   username: user.username,
      //   email: user.email,
      //   createdAt: user.createdAt.toISOString(),
      // });
      const userJwt = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY!
      );

      Cookies.setCookie(userJwt, ctx.res);
      //@ts-ignore
      console.log('user:', { ...user._doc });
      //@ts-ignore
      return { ...user._doc };
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
      return { ...user._doc };
    },
  },
};

export { resolvers };
