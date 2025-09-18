const User = require("../models/User");
const jwt = require("jsonwebtoken");
const z = require("zod");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { id } = require("zod/v4/locales");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = parseInt(process.env.saltRounds);

const userSignUpSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
});

const userSignUp = async (req, res) => {
  const body = req.body;
  const parsed = userSignUpSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid Inputs",
    });
  }

  const userMail = await User.findOne({
    email: body.email,
  });

  if (userMail) {
    return res.status(409).json({
      message: "Email Already Taken/ Incorrect Inputs",
    });
  }

  const hashedPassword = await bcrypt.hash(
    parsed.data.password,
    saltRounds || 10
  );
  parsed.data.password = hashedPassword;

  const dbUser = await User.create(parsed.data);
  const UserId = dbUser._id;

  const token = jwt.sign(
    {
      userId: UserId,
    },
    JWT_SECRET
  );
  res.status(200).json({
    message: "New User is created successfully",
    token: token,
  });
};

const userLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const userLogin = async (req, res) => {
  const body = req.body;
  console.log("Login body", body);
  const parsed = userLoginSchema.safeParse(body);
  if (!parsed.success) {
    console.log("zod validation", parsed.error);
    return res.status(400).json({
      message: "Invalid Inputs",
    });
  }

  const user = await User.findOne({
    email: parsed.data.email,
  });
  console.log("Found user", user);

  if (!user) {
    return res.status(400).json({
      message: "Invalid Email or Invalid Password",
    });
  }

  const comparePassword = await bcrypt.compare(
    parsed.data.password,
    user.password
  );
  console.log("password match", comparePassword);

  if (!comparePassword) {
    return res.status(400).json({
      message: "Invalid Email or Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );
  res.status(200).json({
    message: "User logged in successfully",
    token: token,
  });
};

const getUsers = async (req, res) => {
  const userName = req.query.username;
  if (!userName) {
    return res.status(400).json({
      message: "Not entered the username",
    });
  }

  const allUsers = await User.find({
    username: {
      $regex: userName,
      $options: "i",
    },
  });

  res.json({
    users: allUsers,
  });
};
module.exports = {
  userSignUp,
  userLogin,
  getUsers,
};
