import { Cookies } from "../../../utils/cookies";

export const logOutUser = async (root: any, args: any, ctx: any) => {
  if (!ctx.user) {
    return { success: false, error: null };
  }
  try {
    Cookies.removeTokenCookie(ctx.res);

    return { success: true, error: null };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: {
        status: 500,
        message: e.message,
      },
    };
  }
};
