const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect('mongodb+srv://singhsashank:DPY6hb8eFTSfmyZM@clusterhrm.jpu4rnt.mongodb.net/', {
      dbName: "chatapp",
      useNewUrlParser: true, // You can also use `useUnifiedTopology` if necessary
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

module.exports = connectDB;
