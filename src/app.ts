import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.config";
import { errorHandler } from "./middleware/errorHandler";

//Routes files
import productRoutes from "./routes/product.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import orderRoutes from "./routes/order.route";

dotenv.config();

const APP = express();
const PREFIX = process.env.APP_PREFIX;
const PORT = process.env.APP_PORT;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN_MINUTES = process.env.JWT_EXPIRES_IN_MINUTES;

// Check for required environment variables
if (
  !PREFIX ||
  !PORT ||
  !MONGO_URI ||
  !MONGO_DB_NAME ||
  !JWT_SECRET ||
  !JWT_EXPIRES_IN_MINUTES
) {
  console.error("Error: Missing required environment variables.");
  process.exit(1);
}

APP.use(express.json());

// Registers the product routes with the application.
APP.use(`${PREFIX}/products`, productRoutes);
APP.use(`${PREFIX}/users`, userRoutes);
APP.use(`${PREFIX}/auth`, authRoutes);
APP.use(`${PREFIX}/orders`, orderRoutes);

// Middleware to handle errors globally
APP.use(errorHandler);

// Start the server and connect to the database
APP.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
  connectDB(MONGO_URI, MONGO_DB_NAME);
});
