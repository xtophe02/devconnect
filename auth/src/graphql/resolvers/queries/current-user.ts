export const currentUser = async (root: any, args: any, ctx: any) => {
  try {
    return ctx.user;
  } catch (error) {
    console.log(error);
  }
};
