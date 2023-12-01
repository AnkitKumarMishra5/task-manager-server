import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;