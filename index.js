const express = require("express");
 const connectDB = require("./db.js");
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
 app.use("/user", require("././Routes/auth_routes.js"));
 app.use("/message", require("././Routes/message_routes.js"));
 app.use("/conversation", require("././Routes/conversation_routes.js"));

const server = http.createServer(app);

require("././socket.js")(server);

app.use("/uploads", express.static(path.join(__dirname, "././uploads")));


server.listen(PORT, () => {
  console.log(`🚀 Server started at `);
  connectDB();
});
