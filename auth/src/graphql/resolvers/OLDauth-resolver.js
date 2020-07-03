import jwt from "jsonwebtoken";
import { UserCreatedPublisher } from "../../events/user-created-publisher";
import { Readable } from "stream";
import { User, UserAttrs } from "../../models/user";
import { Password } from "../../utils/password";
import { Cookies } from "../../utils/cookies";
import { natsWrapper } from "../../nats-wrapper";
import { GraphQLUpload } from "apollo-server-express";

const resolvers = {
  Query: {
    hello: (root, args, ctx) => {
      return "Hello World";
    },
    currentUser: async (root, args, ctx) => {
      try {
        const payload = jwt.verify(
          ctx.req.headers.token.split("=")[1],
          process.env.JWT_KEY
        );
        return { ...payload };
      } catch (error) {}
      return { email: "teste" };
    },
  },
  Mutation: {
    signUp: async (root, { data }, ctx) => {
      const { email, password, name, username, avatar } = data;
      console.log(avatar);
      return { email: "test@test.com", id: "1" };
      try {
        const user = await User.findOne({ email });
        if (user) {
          //CREATE BAD REQUEST
          throw new Error("Email already in use");
        }
        const hashedPassword = await Password.toHash(password);
        const newUser = User.build({
          email,
          password: hashedPassword,
          name,
          username,
          avatar,
        });
        //THE SAVE AND PUBLIHSHER SHOULD BE DONE IN MONGODB TRANSACTION
        await newUser.save();

        const userJwt = jwt.sign(
          { id: newUser.id, email: newUser.email },
          process.env.JWT_KEY
        );

        Cookies.setCookie(userJwt, ctx.res);
        //@ts-ignore
        return { ...newUser._doc, id: newUser._id };
      } catch (error) {
        console.error(error);
        throw new Error("something went wrong");
      }

      //NO NEED TO PUBLISH A NEW USER
      // new UserCreatedPublisher(natsWrapper.client).publish({
      //   id: user.id,
      //   name: user.name,
      //   username: user.username,
      //   email: user.email,
      //   createdAt: user.createdAt.toISOString(),
      // });
    },
    signIn: async (root, { data }, ctx) => {
      //TODO inputs validation
      const { email, password } = data;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Email not correct");
      }
      const comparePassword = await Password.compare(user.password, password);
      if (!comparePassword) {
        throw new Error("Password not correct");
      }
      const userJwt = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY
      );

      Cookies.setCookie(userJwt, ctx.res);

      console.log("user:", { ...user._doc });

      return { ...user._doc, id: user._id };
    },
  },
  singleUpload: async (root, { file }, ctx, info) => {
    console.log("aki");
    console.log(file);
    return { filename: "teste", mimetype: "teste", encoding: "teste" };
  },
};

exports.resolvers = resolvers;
