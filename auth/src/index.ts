import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.PORT) {
    throw new Error('PORT must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
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
