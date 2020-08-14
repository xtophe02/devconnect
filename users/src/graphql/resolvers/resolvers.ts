import { User } from "../../models/user";

import { createUser, logInUser, editUser, logOutUser } from "./mutations";
import { allUsers, currentUser } from "./queries";

export const resolvers = {
  Query: {
    hello: (root: any, args: any, ctx: any) => {
      console.log("ali", ctx.user);
      return "hello world";
    },
    allUsers,
    currentUser,
  },
  Mutation: {
    createUser,
    editUser,
    logInUser,
    logOutUser,
  },
  User: {
    __resolveReference: async (object: any) => {
      console.log("UsersREF:", object);
      return User.findById(object.id);
    },
  },
};
