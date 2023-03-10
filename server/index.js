import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const __dirname = path.resolve();

import User from './models/User.js';
import FoodItem from './models/FoodItem.js';
import Table from './models/Table.js';
import Order from './models/Order.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGODB_URL, () => {
//   console.log('Connected to MongoDB Database');
// });

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_NEW, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to the database');
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
    return;
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

app.post('/foodItem', async (req, res) => {
  const { title, description, imgUrl, price, category } = req.body;

  const foodItem = new FoodItem({
    title: title,
    description: description,
    imgUrl: imgUrl,
    price: price,
    category: category,
  });

  const savedFoodItem = await foodItem.save();

  res.json({
    success: true,
    message: 'Food Item created successfully',
    data: savedFoodItem,
  });
});

app.get('/allFoodItems', async (req, res) => {
  const foodItems = await FoodItem.find();

  res.json({
    success: true,
    message: 'Food Items fetched successfully',
    data: foodItems,
  });
});

// http://localhost:5000/foodItemsByCategory?category=Burger
app.get('/foodItemsByCategory', async (req, res) => {
  const { category } = req.query;

  const foodItems = await FoodItem.find({ category: { $regex: category, $options: 'i' } });

  res.json({
    success: true,
    message: 'Food Items fetched successfully',
    data: foodItems,
  });
});

// http://localhost:5000/foodItems?title=corn
app.get('/foodItems', async (req, res) => {
  const { title } = req.query;

  const foodItems = await FoodItem.find({
    title: { $regex: title, $options: 'i' },
  });

  res.json({
    success: true,
    message: 'Food Items fetched successfully',
    data: foodItems,
  });
});

app.post('/table', async (req, res) => {
  const { tableNumber } = req.body;

  const existingTable = await Table.findOne({ tableNumber: tableNumber });

  if (existingTable) {
    return res.json({
      success: false,
      message: 'Table already exists',
    });
  }

  const table = new Table({
    tableNumber: tableNumber,
    occupied: false,
  });

  const createdTable = await table.save();

  res.json({
    success: true,
    message: 'Table created successfully.',
    data: createdTable,
  });
});

app.post('/bookTable', async (req, res) => {
  const { tableNumber, userId } = req.body;

  const existingTable = await Table.findOne({ tableNumber: tableNumber });

  if (existingTable && existingTable.occupied) {
    return res.json({
      success: false,
      message: 'Table already occupied',
    });
  }

  if (existingTable) {
    existingTable.occupied = true;
    existingTable.occupiedBy = userId;
    await existingTable.save();
  }

  res.json({
    success: true,
    message: 'Table booked successfully',
    data: existingTable,
  });
});

app.post('/unbookTable', async (req, res) => {
  const { tableNumber } = req.body;

  const existingTable = await Table.findOne({ tableNumber: tableNumber });

  if (existingTable) {
    existingTable.occupied = false;
    existingTable.occupiedBy = null;
    await existingTable.save();
  }

  res.json({
    success: true,
    message: 'Table unbooked successfully',
    data: existingTable,
  });
});

app.get('/availableTables', async (req, res) => {
  const availableTables = await Table.find();

  res.json({
    success: true,
    message: 'Available Tables fetched successfully',
    data: availableTables,
  });
});

app.post('/orderFoodItems', async (req, res) => {
  const { userId, tableNumber, items } = req.body;

  const totalOrders = await Order.countDocuments();
  const orderId = totalOrders + 1;

  const order = new Order({
    orderId: orderId,
    userId: userId,
    tableNumber: tableNumber,
    items: items,
  });

  const saveOrder = await order.save();

  res.json({
    success: true,
    message: 'Order placed successfully',
    data: saveOrder,
  });
});

app.get('/order', async (req, res) => {
  const { orderId } = req.query;

  const order = await Order.findOne({ orderId: orderId });

  res.json({
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});

app.get('/ordersByUserId', async (req, res) => {
  const { userId } = req.query;

  const orders = await Order.findOne({ userId: userId });

  res.json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

// API routes end here

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
