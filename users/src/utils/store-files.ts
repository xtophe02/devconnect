//rm and use flyimg when online

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const { createWriteStream, unlink } = require("fs");
const mkdirp = require("mkdirp");

const UPLOAD_DIR = "./src/uploads";
// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

export const storeUpload = async (upload: any) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  // const id = mongoose.Types.ObjectId().toHexString();
  const path = `${UPLOAD_DIR}/${new Date().toISOString()}-${filename}`;
  // const path = `${UPLOAD_DIR}/${filename}`;
  const file = { filename, mimetype, path };

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(path);
    console.log(path);
    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);
    // writeStream.on("finish", (result: any) => {
    //   unlink(path, () => {
    //     resolve(result);
    //   });

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", (error: any) => {
      unlink(path, () => {
        reject(error);
      });
    });

    // In node <= 13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", (error: any) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });
  // let cloudPath;
  // try {
  //   const photo = await cloudinary.v2.uploader.upload(
  //     path,
  //     {
  //       use_filename: true,
  //       unique: false,
  //     },
  //     (error: any, result: any) => {
  //       if (error) console.log(error);

  //       // console.log('result', result);
  //     }
  //   );
  //   cloudPath = photo.secure_url;
  //   // couldPath = `${photo.public_id}.${photo.format}`;
  // } catch (error) {
  //   throw new Error(error);
  // }
  console.log(file);
  return { file };
};
