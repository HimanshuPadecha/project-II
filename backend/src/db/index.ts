import mongoose from "mongoose";
import logger from "../utils/winston.logger";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DATABASE_URI!);
    logger.info(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    logger.error("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};