import mongoose from 'mongoose';
// import { MONGO_URI } from '../../config.js';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI
const connectDB = async () => {
  try {
     await mongoose.connect(`${MONGO_URI}`);
    console.log(
      `Database Connected`
    );
  } catch (error) {
    console.log('Database connection error: ', error);
    process.exit(1);
  }
};

export default connectDB;