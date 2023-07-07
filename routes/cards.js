const cardsRouter = require('express').Router();

const cardsController = require('../controllers/cards');
const {
  validateCreateCard,
  validateLikeCard,
  validateDislikeCard,
  validationDeleteCard,
} = require('../middlewares/valiadation');

cardsRouter.get('/', cardsController.getCards);
cardsRouter.post('/', validateCreateCard, cardsController.createCard);
cardsRouter.delete('/:cardId', validationDeleteCard, cardsController.deleteCards);

cardsRouter.put('/:cardId/likes', validateLikeCard, cardsController.likeCard);
cardsRouter.delete('/:cardId/likes', validateDislikeCard, cardsController.dislikeCard);

module.exports = cardsRouter;
