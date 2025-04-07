const { MongoClient } = require("mongodb");

let cachedClient = null;
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    try {
      await cachedClient.connect();
      console.log("MongoDB connected successfully(-_-)");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      throw error;
    }
  }

  cachedDb = cachedClient.db();
  return cachedDb;
};

module.exports = connectDB;
