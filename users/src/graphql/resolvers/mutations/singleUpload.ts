import { cloudinaryUpload } from '../../../utils/store-cloudinary';

export const singleUpload = async (
  root: any,
  args: any,
  ctx: any,
  info: any
) => {
  return cloudinaryUpload(ctx.req.body.variables.file);
};
