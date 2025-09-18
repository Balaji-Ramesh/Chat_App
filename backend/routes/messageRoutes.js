const express = require("express");
const authMiddleware = require("../middleware/authMiddlewares");
const router = express.Router();
const {
  sendMessage,
  getMessage,
} = require("../controllers/messageControllers");

router.post("/messages/send", authMiddleware, sendMessage);
router.get("/messages/:receiverId", authMiddleware, getMessage);

module.exports = router;
