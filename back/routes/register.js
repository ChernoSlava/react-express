const express = require('express');
const registerRouter = express.Router();

const User = require('../models/user');

registerRouter.post('/', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким именем
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Создаем нового пользователя с использованием Mongoose
    const newUser = new User({ username, password, email });

    // Сохраняем пользователя в базе данных
    const savedUser = await newUser.save();
    res.json({ message: 'Registration successful', user: savedUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = registerRouter;
