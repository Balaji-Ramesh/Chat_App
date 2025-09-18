const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const Message = require("./models/Message");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        socket.disconnect();
        return "token undefined";
      }
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.userId = decoded.userId;
      socket.join(socket.userId);
      console.log(`${socket.userId} joined their private room`);

      socket.on("sendmessage", async (data) => {
        console.log("message received", data);
        io.to(data.receiverId).emit("sendMessage", {
          sender: socket.userId,
          message: data.message,
        });
        await Message.create({
          sender: socket.userId,
          receiver: data.receiverId,
          message: data.message,
        });
      });
    } catch (error) {
      console.log(error.message);
      socket.disconnect();
    }

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
