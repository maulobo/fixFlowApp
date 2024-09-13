import mongoose from 'mongoose';

export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('db connection established');
  } catch (err) {
    console.log(err);
  }
};
