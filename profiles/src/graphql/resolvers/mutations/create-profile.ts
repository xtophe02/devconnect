import { Profile } from '../../../models/profile';
export const createProfile = async (
  root: any,
  args: any,
  ctx: any,
  info: any
) => {
  try {
    console.log(ctx.user);
    if (!ctx.user) {
      throw new Error('please');
    }
    // const profile = await Profile.findById(ctx.user.id);
    // if (!profile) {
    //   throw new Error('please to sign');
    // }

    console.log(args);
    return {
      success: true,
      data: null,
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
