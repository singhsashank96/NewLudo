// const express = require("express");
// const connectDB = require("../NewLudo/db.js");
// const path = require("path");
// const cors = require("cors");

// const app = express();

// // Middleware
// const PORT = 5000;
// app.use(cors());

// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(express.json({ limit: "50mb" }));

// // Static Files
// app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// // Routes

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
// app.use("/user", require("../NewLudo/Routes/auth_routes.js"));
// app.use("/message", require("../NewLudo/Routes/message_routes.js"));
// app.use("/conversation", require("../NewLudo/Routes/conversation_routes.js"));

// // Connect to the database
// connectDB();
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Export the app as a serverless function
// module.exports = app;


const express = require("express");
 const connectDB = require("../NewLudo/db.js");
 const cors = require("cors");
const http = require("http");
const PORT = 5000;
const path = require("path");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
 app.use("/user", require("../NewLudo/Routes/auth_routes.js"));
 app.use("/message", require("../NewLudo/Routes/message_routes.js"));
 app.use("/conversation", require("../NewLudo/Routes/conversation_routes.js"));

// Server setup
const server = http.createServer(app);

// Socket.io setup
require("./socket.js")(server); // Initialize socket.io logic

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Start server and connect to database
server.listen(PORT, () => {
  console.log(`🚀 Server started at `);
  connectDB();
});
