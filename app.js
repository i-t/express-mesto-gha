const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/index');
const handleError = require('./middlewares/handleError');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();

app.use(express.json());

app.use(helmet());

app.use(router);

app.use(errors());

app.use(handleError);

app.listen(3000, () => {
  console.log('Server is running');
});
