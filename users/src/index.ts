import mongoose from 'mongoose';

import { app } from './app';

const MONGO_URL = `mongodb+srv://xtophe02:${process.env.USERS_MONGO_URI}@cluster0-4nvyd.mongodb.net/users?retryWrites=true&w=majority`;
// const MONGO_URL = `mongodb://xtophe02:${process.env.USERS_MONGO_URI}@cluster0-shard-00-00-4nvyd.mongodb.net:27017,cluster0-shard-00-01-4nvyd.mongodb.net:27017,cluster0-shard-00-02-4nvyd.mongodb.net:27017/users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.PORT) {
    throw new Error('PORT must be defined');
  }
  if (!process.env.USERS_MONGO_URI) {
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
      useFindAndModify: false,
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
