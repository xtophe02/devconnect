import { Profile } from "../../../models/profile";
import { cloudinaryUpload } from "../../../utils/store-cloudinary";
export const editProfile = async (
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
    const profileUser = Profile.findOneAndUpdate(
      { userId: ctx.user.id },
      {
        $set: {
          ...data,
          photoId: file ? file.photoId : "",
          avatar: file ? file.url : "",
        },
      },
      { new: true }
    );

    return {
      success: true,
      data: profileUser,
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
