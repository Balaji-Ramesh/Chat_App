const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userLogin,
  getUsers,
} = require("../controllers/authControllers");

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/search", getUsers);

module.exports = router;
