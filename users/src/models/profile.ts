const mongoose = require('mongoose');
import { Readable } from 'stream';

export interface Upload {
  stream: Readable;
  filename: string;
  mimetype: string;
  encoding: string;
}
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  githubusername: {
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
});

module.exports = mongoose.model('profile', ProfileSchema);
