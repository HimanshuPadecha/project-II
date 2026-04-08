import { app } from "./app";
import dotenv from "dotenv";
import logger from "./utils/winston.logger";
import { connectDB } from "./db";

dotenv.config({ path: "./.env" });

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    logger.info(`The backend is running on ${process.env.PORT}`);
  });
});
