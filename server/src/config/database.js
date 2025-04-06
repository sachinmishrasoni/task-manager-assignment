import "dotenv/config";
import mongoose from 'mongoose';

// const DB_NAME = 'task-manager';
// const URI = `${process.env.MONGO_URI}/${DB_NAME}`;
const URI = `${process.env.MONGO_URI}`;

// console.log(URI);

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;
