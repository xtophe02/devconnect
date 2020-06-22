import jwt from 'jsonwebtoken';

import { User } from '../../models/user';

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
};

export { resolvers };
