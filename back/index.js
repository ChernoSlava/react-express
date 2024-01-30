const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const router = require('./routes/index');
const User = require('./models/user');


const app = express();
const port = 3001;

mongoose.connection.close();

const dbUri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017/${process.env.MONGODB_DATABASE}`;
console.log(dbUri);
mongoose.connect(dbUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(cors());
app.use(bodyParser.json());

app.use(router);

app.get('/', (req, res) => {
  res.json(
    {
    "user": {
      "id": 123,
      "username": "john_doe",
      "email": "john.doe@example.com",
      "full_name": "John Doe"
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
