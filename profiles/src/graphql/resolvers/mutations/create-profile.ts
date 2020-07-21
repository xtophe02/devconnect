import { Profile } from "../../../models/profile";
export const createProfile = async (
  root: any,
  { data }: any,
  ctx: any,
  info: any
) => {
  try {
    console.log(ctx.user);
    if (!ctx.user) {
      throw new Error("please to signin");
    }
    // const profile = await Profile.findById(ctx.user.id);
    // if (!profile) {
    //   throw new Error('please to sign');
    // }

    console.log(data);
    return {
      success: true,
      data: { userId: { id: ctx.user.id }, username: data.username },
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
