const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mainRouter = require("./routes/authRoutes");
const messageRouter = require("./routes/messageRoutes");
dotenv.config();
const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};

const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
  transports: ["websocket", "polling"],
});

app.use(cors(corsOptions));
app.use(express.json());
connectDB();

app.use("/api/v1", mainRouter);
app.use("/api/v1", messageRouter);

require("./socket")(io);

server.listen(PORT, () => {
  console.log("Server started", PORT);
});
