const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    }));
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

const deleteCards = (req, res) => {
  const { cardId } = req.params;
  Card
    .findByIdAndRemove(cardId)
    .orFail()
    .then(() => res.status(200).send({ message: 'Card Removed' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect Data' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card Not Found' });
      }
      return res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
  // Card
  //   .findById(req.params.cardId)
  //   .orFail(() => {
  //     throw new Error('404');
  //   })
  //   .then((card) => {
  //     Card.deleteOne(card);
  //     res.status(200).send({ message: 'Removed' });
  //   })

  //   .catch((err) => {
  //     if (err.message === '404') {
  //       res.status(404).send({ message: 'Card Not Found' });

  //       return;
  //     }
  //     res.status(500).send({
  //       message: 'Internal Server Error',
  //       err: err.message,
  //       stack: err.stack,
  //     });
  //   });
};

const likeCard = (req, res) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
  // .orFail(() => {
  //   throw new Error('404');
  // })
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Card Not Found' });
    }
    res.status(200).send({ message: 'Card liked' });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Incorrect Data' });
    }

    res.status(500).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    });
  });

const dislikeCard = (req, res) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
  )
  .orFail(() => {
    throw new Error('404');
  })
  .then(() => res.status(200).send({ message: 'Card disliked' }))
  .catch((err) => {
    if (err.message === '404') {
      res.status(404).send({ message: 'User Not Found' });
      return;
    }

    res.status(500).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    });
  });

module.exports = {
  getCards,
  createCard,
  deleteCards,
  likeCard,
  dislikeCard,
};
