const express = require("express");
const connectDB = require("../NewLudo/db.js");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", require("../NewLudo/Routes/auth_routes.js"));
app.use("/message", require("../NewLudo/Routes/message_routes.js"));
app.use("/conversation", require("../NewLudo/Routes/conversation_routes.js"));

// Connect to the database
connectDB();

// Export the app as a serverless function
module.exports = app;
