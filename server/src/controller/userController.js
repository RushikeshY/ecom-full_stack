const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

exports.registerUser = asyncHandler(async(req,res)=>{

    const {name,email,password,mobile} = req.body;

    if(!name || !email || !password || !mobile ){
        req.status(400).json({message:"All fields required"})

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
  

    const user = await User.create({
        name,
        email,
        password,
        mobile
    })


    res.status(201).json({message : `${user.name} you registered successfully`})


})


exports.loginUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;

    if(!email || !password  ){
        req.status(400).json({message:"All fields required"})
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
  
    res.status(200).json({ message: "Login successful", user: user.email });

})

// module.exports = {registerUser,loginUser}