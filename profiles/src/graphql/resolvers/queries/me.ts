export const me = async (
  parent: any,
  { options }: any,
  ctx: any,
  info: any
) => {
  try {
    const user = await User.findById(ctx.user.id);
    if (!user) throw new Error('please to sign');
    return user;
  } catch (error) {
    console.error(error);
  }
};
