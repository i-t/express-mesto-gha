const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Incorrect Data', stack: err.stack });
      } else {
        next(err);
      }
    });
};

const deleteCards = (req, res, next) => {
  const { cardId } = req.params;
  Card
    .findByIdAndRemove(cardId)
    .orFail()
    .then(() => res.status(200).send({ message: 'Card Removed' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Incorrect Data' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Card Not Found' });
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Card Not Found' });
    }
    res.status(200).send({ message: 'Card liked' });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Incorrect Data' });
    } else {
      next(err);
    }
  });

const dislikeCard = (req, res, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Card Not Found' });
    }
    res.status(200).send({ message: 'Card disliked' });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Incorrect Data' });
    } else {
      next(err);
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCards,
  likeCard,
  dislikeCard,
};
