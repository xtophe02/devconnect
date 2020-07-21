import jwt from "jsonwebtoken";
import { Roles } from "@cmdevconnect/common";
import { User } from "../../../models/user";
import { Password } from "../../../utils/password";
import { Cookies } from "../../../utils/cookies";

export const editUser = async (root: any, { data }: any, ctx: any) => {
  if (!ctx.user) {
    throw new Error("Needs to be Logged In to edit");
  }

  if (data.role === Roles.Admin) {
    throw new Error("Cannot become admin");
  }
  if (ctx.user.role === Roles.User && data.role !== Roles.User) {
    throw new Error(`User ${ctx.user.email} cannot change role`);
  }
  try {
    const hashedPassword = await Password.toHash(data.password);

    const user = await User.findOneAndUpdate(
      { email: data.email },
      {
        $set: { ...data, password: hashedPassword },
      },
      { new: true, runValidators: true }
    );

    const userJwt = jwt.sign(
      { id: user!.id, email: user!.email, role: user!.role },
      process.env.JWT_KEY!
    );
    Cookies.setCookie(userJwt, ctx.res);

    return { success: true, error: null };
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
