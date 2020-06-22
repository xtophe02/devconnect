import jwt from 'jsonwebtoken';

import { User, UserAttrs } from '../../models/user';
import { Password } from '../../utils/password';

interface UserPayload {
  id: string;
  email: string;
}

const resolvers = {
  Query: {
    hello: () => 'Hello World',
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
      await user.save();
      console.log(user);
      const userJwt = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };
      return { email: user.email };
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
