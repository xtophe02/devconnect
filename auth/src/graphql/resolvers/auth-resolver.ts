import jwt from 'jsonwebtoken';
import { UserCreatedPublisher } from '../../events/user-created-publisher';

import { serialize, parse } from 'cookie';

import { User } from '../../models/user';
import { Password } from '../../utils/password';
import { natsWrapper } from '../../nats-wrapper';

interface UserPayload {
  id: string;
  email: string;
}

const resolvers = {
  Query: {
    hello: (root: any, args: any, ctx: any) => {
      const cookie = serialize('token', 'cookieteste', {
        maxAge: 60 * 60 * 8,
        expires: new Date(Date.now() + 60 * 60 * 8 * 1000),
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'lax',
      });
      ctx.res.setHeader('Set-Cookie', cookie);
      return 'Hello World';
    },
    hello2: (root: any, args: any, ctx: any) => {
      console.log(ctx.req.headers.token);
      return 'Hello World2';
    },
    currentUser: async (root: any, { data }: any, { req, res }: any) => {
      if (!req.session?.jwt) {
        return;
      }
      try {
        const payload = jwt.verify(
          req.session?.jwt,
          process.env.JWT_KEY!
        ) as UserPayload;
        console.log(payload);
        return { ...payload };
      } catch (error) {}
      return;
    },
  },
  Mutation: {
    signUp: async (root: any, { data }: any, { req, res }: any) => {
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

      new UserCreatedPublisher(natsWrapper.client).publish({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
      });
      const userJwt = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };
      console.log('user:', user);
      return { user };
    },
    signIn: async (root: any, { data }: any, { req, res }: any) => {
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

      req.session = { jwt: userJwt };
      return { email: user.email };
    },
  },
};

export { resolvers };
