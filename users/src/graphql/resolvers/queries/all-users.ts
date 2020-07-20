import { User } from "../../../models/user";
export const allUsers = async (root: any, args: any, ctx: any) => {
  try {
    const usersCollection = await User.find();
    return {
      success: true,
      data: usersCollection,
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
};
