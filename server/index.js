import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log('Connected to MongoDB Database');
});

// API routes starts here

app.post('/signup', async (req, res) => {
  const { name, phone, email, password, role } = req.body;

  const emptyFields = [];

  // validations to check if all fields are filled start
  if (!name) emptyFields.push('name');
  if (!email) emptyFields.push('email');
  if (!phone) emptyFields.push('phone');
  if (!password) emptyFields.push('password');
  if (!role) emptyFields.push('role');

  if (emptyFields.length > 0) {
    res.json({
      success: false,
      message: `${emptyFields.join(', ')} are required`,
    });
  }
  // validations to check if all fields are filled end

  // validations to check if email already exist start
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.json({
      success: false,
      message: 'Email already exists',
    });
  }
  // validations to check if email already exist end

  // validations to check if phone already exist start
  const existingUserPhone = await User.findOne({ phone: phone });
  if (existingUserPhone) {
    return res.json({
      success: false,
      message: 'Phone already exists',
    });
  }

  const user = new User({
    name: name,
    phone: phone,
    email: email,
    password: password,
    role: role,
  });

  const savedUser = await user.save();

  res.json({
    success: true,
    message: 'User created successfully',
    data: savedUser,
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: 'Email and password are required',
    });
  }

  const existingUser = await User.findOne({ email: email, password: password });

  if (existingUser) {
    return res.json({
      success: true,
      message: 'User logged in successfully',
      data: existingUser,
    });
  } else {
    return res.json({
      success: false,
      message: 'Invalid email or password',
    });
  }
});

// API routes end here

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
