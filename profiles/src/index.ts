import mongoose from 'mongoose';

import { app } from './app';

const MONGO_URL = `mongodb+srv://xtophe02:${process.env.PROFILES_MONGO_URI}@cluster0-4nvyd.mongodb.net/profiles?retryWrites=true&w=majority`;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.PORT) {
    throw new Error('PORT must be defined');
  }
  if (!process.env.PROFILES_MONGO_URI) {
    throw new Error('MONGO URI must be defined');
  }
  if (!process.env.CLOUD_SECRET) {
    throw new Error('CLOUD_SECRET must be defined');
  }
  try {
    //CONNECT TO MONGODB
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to db...');
  } catch (error) {
    console.error(error);
  }

  app.listen(process.env.PORT, () =>
    console.log(`listen port ${process.env.PORT}`)
  );
};

start();
