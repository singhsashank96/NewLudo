const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io"); // Import socket.io
const path = require("path");

const app = express();

// CORS configuration for HTTP requests
const corsOptions = {
  origin: "https://celebrated-druid-627e29.netlify.app", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // if you need to send cookies or headers with requests
};

app.use(cors(corsOptions)); // Apply CORS middleware to Express

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", require("././Routes/auth_routes.js"));
app.use("/message", require("././Routes/message_routes.js"));
app.use("/conversation", require("././Routes/conversation_routes.js"));

const server = http.createServer(app);

// Socket.io configuration with CORS for WebSocket connections
const io = socketIo(server, {
  cors: {
    origin: "https://celebrated-druid-627e29.netlify.app", // your frontend URL
    methods: ["GET", "POST"], // Allowed WebSocket methods
    credentials: true, // Allow cookies or credentials
  },
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("New WebSocket connection established");

  // Define your socket events here, for example:
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", data); // Broadcasting message to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

require("././socket.js")(server); // Assuming this is where you're using your socket logic

app.use("/uploads", express.static(path.join(__dirname, "././uploads")));

// Start server and connect DB
server.listen(5000, () => {
  console.log(`🚀 Server started at http://localhost:5000`);
  connectDB();
});
