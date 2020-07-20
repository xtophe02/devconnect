// import { Post } from '../../models/post';

import { signUp, signIn } from './mutations';
import { hello2, currentUser } from './queries';

export const resolvers = {
  Query: {
    hello2,
  },
  Mutation: {},
};
