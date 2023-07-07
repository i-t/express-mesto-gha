const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();

app.use(express.json());

app.use(helmet());

app.use(router);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      stack: err.stack,
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(3000, () => {
  console.log('Server is running');
});
