import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err:any) => {
      console.log("MongoDB error " + err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error);
  }
}