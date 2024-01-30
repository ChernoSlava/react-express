const express = require('express');
const secureRouter = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

secureRouter.get('/', (req, res) => {
  // Проверяем наличие токена в заголовках запроса
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Верифицируем токен
    const decoded = jwt.verify(token, process.env.SERVER_SECRET_KEY);
    res.json({ message: 'Secure endpoint', user: decoded });
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = secureRouter;
