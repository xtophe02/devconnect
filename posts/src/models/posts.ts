import mongoose from 'mongoose';

export interface PostAttrs {
  title: string;
  body: string;
  publish: boolean;
}
//methods user model has
interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

//prop user Document has
interface PostDoc extends mongoose.Document {
  title: string;
  body: string;
  publish: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post };
