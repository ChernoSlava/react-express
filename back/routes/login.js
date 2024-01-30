const express = require('express');
const loginRouter = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с указанным именем
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Проверяем совпадение пароля
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Генерируем токен для пользователя
    const token = jwt.sign({ username: user.username }, process.env.SERVER_SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = loginRouter;
