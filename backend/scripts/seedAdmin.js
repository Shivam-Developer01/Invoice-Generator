import mongoose from "mongoose";

import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import User from "../src/models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const existingUser = await User.findOne({
  email: "admin@gmail.com",
});

if (existingUser) {

  process.exit();
}

await User.create({
  name: "Administrator",

  email: "admin@gmail.com",

  password: "Admin@123",

  role: "CO_FOUNDER",
});

process.exit();