const { get } = require("mongoose");
const Message = require("../models/Message");
const User = require("../models/User");
const z = require("zod");

const sendMessageSchema = z.object({
  receiver: z.string(),
  message: z.string().nonempty(),
});

const sendMessage = async (req, res) => {
  const body = req.body;
  const parsed = sendMessageSchema.safeParse(body);
  const content = parsed.data.message;
  const sender = req.userId;
  const receiver = parsed.data.receiver;
  if (!parsed.success) {
    return res.status(400).json({
      message: "Incorrect Inputs",
    });
  }

  const exitingUser = await User.findById(receiver);

  if (!exitingUser) {
    return res.status(401).json({
      message: "Invalid receiver",
    });
  }

  const newMessage = await Message.create({
    sender,
    receiver,
    message: content,
  });
  res.status(200).json({
    message: "Message sent to receiver",
    data: newMessage,
  });
};

const getMessage = async (req, res) => {
  const { receiverId } = req.params;
  const currentUser = req.userId;
  if (!receiverId) {
    return res.status(400).json({
      message: "ReceiverId is required",
    });
  }
  try {
    const getUserMessage = await Message.find({
      $or: [
        { sender: currentUser, receiver: receiverId },
        { sender: receiverId, receiver: currentUser },
      ],
    })
      .sort({ createdAt: 1 })
      .lean({});

    return res.status(200).json({
      chat: getUserMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = { sendMessage, getMessage };
