export const singleUpload = async (
  root: any,
  args: any,
  ctx: any,
  info: any
) => {
  const { createReadStream, filename, mimetype } = await ctx.req.body.file;

  const stream = createReadStream();
  const path = `http://46.101.231.185/upload/w_500/`;
  await new Promise((resolve, reject) => {});
  // const { createReadStream, filename, mimetype } = await upload;
  // await new Promise((resolve, reject) => {
  //   // Create a stream to which the upload will be written.
  //   const writeStream = createWriteStream(path);

  //   // When the upload is fully written, resolve the promise.
  //   writeStream.on('finish', resolve);

  //   // If there's an error writing the file, remove the partially written file
  //   // and reject the promise.
  //   writeStream.on('error', (error: any) => {
  //     unlink(path, () => {
  //       reject(error);
  //     });
  //   });

  //   // In node <= 13, errors are not automatically propagated between piped
  //   // streams. If there is an error receiving the upload, destroy the write
  //   // stream with the corresponding error.
  //   stream.on('error', (error: any) => writeStream.destroy(error));

  //   // Pipe the upload into the write stream.
  //   stream.pipe(writeStream);
  // })
};
