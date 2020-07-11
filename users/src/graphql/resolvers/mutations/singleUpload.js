import { extname } from "path";
import mongoose from "mongoose";
import s3 from "../../lib/s3";

export const singleUpload = async (root, args, ctx, info) => {
  // const file = await storeUpload(ctx.req.body.file);
  const id = mongoose.Types.ObjectId().toHexString();
  const { createReadStream, filename, mimetype, encoding } = await ctx.req.body
    .file;

  const { Location } = await s3
    .upload({
      Body: createReadStream(),
      Key: `${id}${extname(filename)}`,
      ContentType: mimetype,
    })
    .promise();

  return { filename, mimetype, encoding, url: Location };
};
