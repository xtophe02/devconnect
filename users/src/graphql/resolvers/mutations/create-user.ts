import jwt from "jsonwebtoken";
import { Roles } from "@cmdevconnect/common";
import { User } from "../../../models/user";
import { Password } from "../../../utils/password";
import { Cookies } from "../../../utils/cookies";

export const createUser = async (root: any, { data }: any, ctx: any) => {
  if (!ctx.user) {
    throw new Error("Needs to be Logged In to create user");
  }
  //DO TRANSACTIONS
  const user = await User.findOne({ email: data.email });
  const onwer = await User.findById(ctx.user.id);
  if (user) {
    //CREATE BAD REQUEST
    throw new Error("User Email already exists");
  }
  if (ctx.user.role === Roles.User) {
    throw new Error("Needs to be Admin or Manager to create an User");
  }

  if (onwer!.invitations <= 0) {
    throw new Error(`User ${ctx.user.email} cannot send more invitations`);
  }
  try {
    // let invitationsDecrease = onwer!.invitations - 1
    const hashedPassword = await Password.toHash(data.password);
    // console.log(ctx.req.body.variables.data.avatar);

    const newUser = User.build({
      ...data,
      password: hashedPassword,
      owner: ctx.user.email, //need to be logedin to createUser
    });

    await newUser.save();
    await onwer?.updateOne({ $inc: { invitations: -1 } });
    const userJwt = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_KEY!
    );
    Cookies.setCookie(userJwt, ctx.res);

    return { data: newUser, success: true, error: null };
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
