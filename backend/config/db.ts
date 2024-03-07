import mongoose from "mongoose";

const connectionString: string = process.env.MONGODB_CONNECTION_STRING!;

const DbConnection = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};

export default DbConnection;
