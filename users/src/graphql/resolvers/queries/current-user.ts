import { User } from "../../../models/user";
export const currentUser = async (root: any, args: any, ctx: any) => {
  if (!ctx.user) {
    //CREATE COMMON AUTH ERROR
    throw new Error("Please to sign");
  }
  try {
    const userCollection = await User.findById(ctx.user.id);
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
};
