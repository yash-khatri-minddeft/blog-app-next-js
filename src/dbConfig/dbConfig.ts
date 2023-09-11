import mongoose from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () =>
      console.log("Connection established Successfully")
    );
    connection.on("error", () => {
      console.log("connection error:");
      process.exit();
    });
  } catch (error: any) {
    console.log(error);
  }
}
