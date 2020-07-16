import { User, UserAttrs } from '../../models/user';
import cloudinary from 'cloudinary';
import { signUp, signIn, singleUpload, signOut } from './mutations';
import { hello, currentUser, me } from './queries';
import { GraphQLScalarType } from 'graphql';

export interface UserData extends UserAttrs {
  data: {
    email: string;
    name: string;
    username: string;
    password: string;
    avatar: string;
  };
}
export const resolvers = {
  Query: {
    me,
    hello,
    currentUser,
  },
  Mutation: {
    signUp,
    signIn,
    singleUpload,
    signOut,
  },
  User: {
    __resolveReference: async (object: any) => {
      try {
        const userCollection = await User.findById(object.id);
        console.log(userCollection);
        return {
          success: true,
          data: userCollection,
          error: null,
        };
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
    },
    avatar: async (parent: any, { options }: any, ctx: any) => {
      // let url = await cloudinary.v2.url(parent.avatar);
      let url = parent.avatar;
      if (options) {
        // width: Int, q_auto: Boolean, f_auto: Boolean, face: 'face'
        const [width, q_auto, f_auto, face] = options;

        const cloudinaryOptions = {
          ...(q_auto === 'true' && { quality: 'auto' }),
          ...(f_auto === 'true' && { fetch_format: 'auto' }),
          ...(face && { crop: 'thumb', gravity: 'face' }),
          width,
          secure: true,
        };

        url = await cloudinary.v2.url(parent.photoId, cloudinaryOptions);

        console.log('url', url);
      }
      return url;
    },
  },
  CloudinaryOptions: new GraphQLScalarType({
    name: 'CloudinaryOptions',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      //@ts-ignore
      return ast.value.split(',');
    },
  }),
};
