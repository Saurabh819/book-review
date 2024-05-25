const express = require("express");
const app = express();

const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require('mongoose');



const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExistUser = await User.findOne({ where: { email } });
    if (isExistUser) {
      return res.status(403).json({
        success: false,
        massage: "user Already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "user Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userData = await User.findOne( { email :req.body.email });
      
      if (!userData) {
        return res.status(400).json({
          success: false,
          massage: "Email or Password is Incorrect",
        });
      }
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (!passwordMatch) {
        return res.status(400).json({
          success: false,
          message: "Email or Password is Incorrect in varification",
        });
      }
  
      const token = jwt.sign(
        { id: userData.id, email: userData.email, role: userData.role },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );
  
      return res.status(200).json({
        success: true,
        message: "User Loggedin successfully",
        data: userData,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
};


module.exports = {
    registerUser,loginUser
}