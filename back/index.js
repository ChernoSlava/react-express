const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
const data = {
  "user": {
    "id": 123,
    "username": "john_doe",
    "email": "john.doe@example.com",
    "full_name": "John Doe"
  },
  "products": [
    {
      "id": 1,
      "name": "Product A",
      "price": 19.99
    },
    {
      "id": 2,
      "name": "Product B",
      "price": 29.99
    },
    {
      "id": 3,
      "name": "Product C",
      "price": 39.99
    }
  ],
  "message": "Привет, это тестовый JSON! Наслаждайтесь использованием."
};

const secretKey = 'yourSecretKey'; // Замените на свой секретный ключ
app.get('/', (req, res) => {
  res.json(data);
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Проверка учетных данных (пример, вы можете использовать базу данных)
  if (username === 'slava' && password === '1234') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Проверка, что пользователь с таким именем пользователя не существует (в реальном приложении используйте базу данных)
  if (username === 'user') {
    return res.status(409).json({ error: 'Username is already taken' });
  }

  // Хеширование пароля перед сохранением (используйте bcrypt)
  // В реальном приложении, пароли следует хранить в хешированном виде, не в чистом
  const hashedPassword = password; // Замените на хешированный пароль

  // Сохранение информации о новом пользователе (в реальном приложении используйте базу данных)
  console.log('New user registered:', { username, hashedPassword });
  res.json({ message: 'Registration successful' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
