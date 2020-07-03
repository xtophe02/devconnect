import mongoose from "mongoose";
const { createWriteStream, unlink } = require("fs");
const UPLOAD_DIR = "./uploads";

export const storeUpload = async (upload: any) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const id = mongoose.Types.ObjectId().toHexString();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;
  const file = { id, filename, mimetype, path };

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(path);

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);

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
  console.log(file);
  // Record the file metadata in the DB.
  // db.get('uploads').push(file).write();

  return file;
};
