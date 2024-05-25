const express = require("express");
const app = express();

const Admin = require("../model/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require('mongoose');



const registeradmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExistAdmin = await Admin.findOne({ where: { email } });
    if (isExistAdmin) {
      return res.status(403).json({
        success: false,
        massage: "admin Already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      Adminname: req.body.Adminname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Admin Registered Successfully",
      data: newAdmin,
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

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const AdminData = await Admin.findOne( { email :req.body.email });
    console.log(AdminData)
    if (!AdminData) {
      return res.status(400).json({
        success: false,
        massage: "Email or Password is Incorrect",
      });
    }
    const passwordMatch = await bcrypt.compare(password, AdminData.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or Password is Incorrect in varification",
      });
    }

    const token = jwt.sign(
      { id: AdminData.id, email: AdminData.email, role: AdminData.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin Loggedin successfully",
      data: AdminData,
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
    registeradmin,loginAdmin
}