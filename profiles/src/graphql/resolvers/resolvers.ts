import cloudinary from 'cloudinary';
import { createProfile } from './mutations';
import { me } from './queries';
import { GraphQLScalarType } from 'graphql';

export const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    createProfile,
  },
  Profile: {
    __resolveReference: async (object: any) => {
      try {
        // const userCollection = await Profile.findById(object.id);

        return {
          success: true,
          data: null,
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
