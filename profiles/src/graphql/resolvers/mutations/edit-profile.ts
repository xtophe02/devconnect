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

    let newData = data;
    if (data.avatar) {
      const file = await cloudinaryUpload(data.avatar);
      newData = { ...data, photoId: file.photoId, avatar: file.url };
    }

    const profileUser = Profile.findOneAndUpdate(
      { userId: ctx.user.id },
      {
        $set: {
          ...newData,
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
