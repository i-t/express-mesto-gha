const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
    required: [true, 'Укажите имя'],
  },
  about: {
    type: String,
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
    required: [true, 'Укажите описание'],
  },
  avatar: {
    type: String,
    required: [true, 'Укажите ссылку на изображение'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
