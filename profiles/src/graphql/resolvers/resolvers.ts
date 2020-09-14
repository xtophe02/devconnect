import cloudinary from "cloudinary";
import { createProfile, editProfile } from "./mutations";
import { GraphQLScalarType } from "graphql";
import { Profile } from "../../models/profile";

export const resolvers = {
  Query: {},
  Mutation: {
    createProfile,
    editProfile,
  },
  User: {
    profile: async (user: any) => Profile.findOne({ userId: user.id }),
  },
  Profile: {
    userId: async (profile: any) => {
      return { __typename: "User", id: profile.userId };
    },
    avatar: async (parent: any, { options }: any, ctx: any) => {
      // let url = await cloudinary.v2.url(parent.avatar);
      let url = parent.avatar;
      if (options) {
        // width: Int, q_auto: Boolean, f_auto: Boolean, face: 'face'
        const [width, q_auto, f_auto, face] = options;

        const cloudinaryOptions = {
          ...(q_auto === "true" && { quality: "auto" }),
          ...(f_auto === "true" && { fetch_format: "auto" }),
          ...(face && { crop: "thumb", gravity: "face" }),
          width,
          secure: true,
        };

        url = await cloudinary.v2.url(parent.photoId, cloudinaryOptions);

        console.log("url", url);
      }
      return url;
    },
  },
  CloudinaryOptions: new GraphQLScalarType({
    name: "CloudinaryOptions",
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      //@ts-ignore
      return ast.value.split(",");
    },
  }),
};
