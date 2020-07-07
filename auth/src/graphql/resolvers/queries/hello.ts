export const hello = (root: any, args: any, ctx: any) => {
  console.log(ctx.user);
  return 'Hello World';
};
