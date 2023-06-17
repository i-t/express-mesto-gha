const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId('648c63806c330125165e81ec'),
  };
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log('Server is running');
});
