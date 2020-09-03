import { Profile } from "../../../models/profile";
import { cloudinaryUpload } from "../../../utils/store-cloudinary";
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

    let file;
    if (data.avatar) {
      file = await cloudinaryUpload(data.avatar);
    }

    const newProfile = await Profile.build({
      ...data,
      userId: ctx.user.id,
      photoId: file ? file.photoId : "",
      avatar: file ? file.url : "",
    });
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
