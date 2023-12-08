import mongoose from "mongoose";
import dotenv from "./dotenv";
import logger from './logger';

dotenv.config();

const {
    DB_HOST = '127.0.0.1',
    DB_PORT = '27017',
    DB_USER = 'cluster0',
    DB_PWD = 'Dung050402',
    DB_NAME = 'my_db'
} = process.env;

const DB_URL = `mongodb+srv://dungnguyenkma050402:${DB_PWD}@${DB_USER}.6j7ulp8.mongodb.net/?retryWrites=true&w=majority`;

const connectDatabase = (callback?: () => void) => {
    mongoose
        .connect(DB_URL, {
            dbName: DB_NAME
        })
        .then(() => {
            logger.info("MongoDB connected test:", {
                url: DB_URL,
                dbName: DB_NAME,
                // dbHost:DB_HOST
            });
            if (callback) callback();
        })
        .catch((err) => logger.error("MongoDB initial connection error: ", err));

    mongoose.connection.on("error", (err) => {
        console.log("MongoDB error: ", err);
    });
};

export default connectDatabase;
