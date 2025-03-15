import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_CONNECTION;

export async function connectDB() {
  try {
    console.log("connecting DB...");
    await mongoose.connect(mongodbUrl as string).then(() => {
      console.log("connect DB successful");
    });
  } catch (error) {
    console.log(error);
  }
}
