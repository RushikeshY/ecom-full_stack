const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  console.log(req.body);

  if (!name || !email || !password || !mobile) {
    res.status(400).json({ message: "All fields required" });
  }



  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const salt =await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    mobile,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json("Invalid user data");
  }
  // res.status(201).json({ message: `${user.name} you registered successfully` })
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: "Invalid creadentials" });
  }

  res.status(200).json({ message: "Login successful", user: user.email });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// module.exports = {registerUser,loginUser}
