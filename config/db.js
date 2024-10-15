import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connecttionData = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDb: ${connecttionData.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export { connectDB };
