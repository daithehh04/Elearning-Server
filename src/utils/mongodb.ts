import mongoose from "mongoose"
import dotenv from "./dotenv"
import logger from "./logger"

dotenv.config()

const { DB_NAME = "my_db" } = process.env

const DB_URL = `mongodb+srv://daithehh04:the123456@cluster0.yfad8mm.mongodb.net/`

const connectDatabase = (callback?: () => void) => {
  mongoose
    .connect(DB_URL, {
      dbName: DB_NAME,
    })
    .then(() => {
      logger.info("MongoDB connected test:", {
        url: DB_URL,
        dbName: DB_NAME,
        // dbHost:DB_HOST
      })
      if (callback) callback()
    })
    .catch((err) => logger.error("MongoDB initial connection error: ", err))

  mongoose.connection.on("error", (err) => {
    console.log("MongoDB error: ", err)
  })
}

export default connectDatabase
