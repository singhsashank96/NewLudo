const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const path = require("path");

const app = express();

// CORS setup (allow requests from your front-end domain)
const corsOptions = {
  origin: "http://localhost:3000",  // Replace with your actual front-end domain
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));  // Applying CORS middleware
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Test route to check server is running
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect to the database
connectDB();

// Route imports
app.use("/user", require("./Routes/auth_routes.js"));
app.use("/message", require("./Routes/message_routes.js"));
app.use("/conversation", require("./Routes/conversation_routes.js"));

// Static file serving for uploads (if applicable)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Export the app as a serverless function
module.exports = app;
