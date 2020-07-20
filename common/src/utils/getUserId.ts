import jwt from "jsonwebtoken";

interface UserJwtPayload {
  id: string;
  email: string;
  role: string;
}
export const getUserId = (req: any) => {
  try {
    if (req.headers.token) {
      const payload = jwt.verify(
        req.headers.token.split("=")[1],
        process.env.JWT_KEY!
      ) as UserJwtPayload;
      return { ...payload };
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
