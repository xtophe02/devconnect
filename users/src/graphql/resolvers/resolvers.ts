import { User } from "../../models/user";

import { createUser, logInUser } from "./mutations";
import { allUsers, currentUser } from "./queries";

export const resolvers = {
  Query: {
    allUsers,
    currentUser,
  },
  Mutation: {
    createUser,
    // editUser,
    logInUser,
    // logOutUser,
  },
  User: {
    __resolveReference: async (object: any) => User.findById(object.id),
  },
};
