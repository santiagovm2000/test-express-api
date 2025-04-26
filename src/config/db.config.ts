import mongoose from "mongoose";

/**
 * Connects to a MongoDB database using the provided URI and database name.
 *
 * @param mongoUri - The connection string (URI) for the MongoDB instance.
 * @param mongoDbName - The name of the database to connect to.
 * @returns A promise that resolves when the connection is successfully established.
 * @throws Will log an error message and terminate the process if the connection fails.
 */
export const connectDB = async (mongoUri: string, mongoDbName: string) => {
  try {
    const conn = await mongoose.connect(mongoUri, {
      dbName: mongoDbName,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error?.message}`);
    process.exit(1);
  }
};
