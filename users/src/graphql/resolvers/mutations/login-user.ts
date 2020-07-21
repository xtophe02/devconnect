import jwt from "jsonwebtoken";

import { User } from "../../../models/user";
import { Password } from "../../../utils/password";
import { Cookies } from "../../../utils/cookies";

export const logInUser = async (root: any, { data }: any, ctx: any) => {
  //TODO inputs validation
  const { email, password } = data;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }

    const comparePassword = await Password.compare(user.password, password);
    if (!comparePassword) {
      throw new Error("Password not correct");
    }
    const userJwt = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_KEY!
    );
    Cookies.setCookie(userJwt, ctx.res);

    return { data: user, success: true, error: null };
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
