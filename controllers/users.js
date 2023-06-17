const mongoose = require('mongoose');
const User = require('../models/user');

const getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  User
    .findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'User Not Found' });
        return;
      } next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User
    .create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Validation Error' });
        return;
      } next(err);
    });
};

const updateInfo = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateInfo,
  updateAvatar,
};
