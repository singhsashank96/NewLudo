const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const http = require("http");
const PORT = 5000;
const path = require("path");

const app = express();
// app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000/",  // Replace with your actual front-end domain
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));



app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", require("./Routes/auth_routes.js"));
app.use("/message", require("./Routes/message_routes.js"));
app.use("/conversation", require("./Routes/conversation_routes.js"));

// Server setup
const server = http.createServer(app);

// Socket.io setup
require("./socket.js")(server); // Initialize socket.io logic

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Start server and connect to database
server.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
  connectDB();
});
