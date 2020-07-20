import mongoose from 'mongoose';

export interface ProfileAttrs {
  name: string;
  username: string;
  userId: string;
  location: string;
  skills: [string];
  social: { facebook: string; linkedin: string };
  githubUsername: string;
  avatar: string;
  photoId: string;
}

//prop user Document has
interface ProfileDoc extends mongoose.Document {
  userId: string;
  name: string;
  username: string;
  location: string;
  skills: [string];
  social: { facebook: string; linkedin: string };
  githubUsername: string;
  avatar: string;
  photoId: string;
}
//methods user model has
interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}
const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    location: {
      type: String,
    },
    skills: {
      type: [String],
    },
    githubusername: {
      type: String,
    },
    username: {
      type: String,
    },
    photoId: {
      type: String,
    },
    avatar: {
      type: String,
    },

    social: {
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  'Profile',
  ProfileSchema
);

export { Profile };
