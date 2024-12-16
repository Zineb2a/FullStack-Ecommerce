import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("debug", true); // Enable Mongoose debugging
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "e-commerce",
      connectTimeoutMS: 30000, // Optional: Increase connection timeout
    });
    console.log("DB Connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error.message);
    console.error(error.stack); // Log full error details for debugging
    process.exit(1); // Stop the server if the database connection fails
  }
};

// Mongoose event listeners for debugging
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB.");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected.");
});

export default connectDB;
