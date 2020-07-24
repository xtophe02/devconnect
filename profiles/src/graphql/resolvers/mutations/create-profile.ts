import { Profile } from "../../../models/profile";
export const createProfile = async (
  root: any,
  { data }: any,
  ctx: any,
  info: any
) => {
  try {
    if (!ctx.user) {
      throw new Error("please to signin");
    }
    const newProfile = await Profile.build({ userId: ctx.user.id, ...data });
    await newProfile.save();

    return {
      success: true,
      data: newProfile,
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
