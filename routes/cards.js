const cardsRouter = require('express').Router();

const cardsController = require('../controllers/cards');

cardsRouter.get('/', cardsController.getCards);
cardsRouter.post('/', cardsController.createCard);
cardsRouter.delete('/:cardId', cardsController.deleteCards);

cardsRouter.put('/:cardId/likes', cardsController.likeCard);
cardsRouter.delete('/:cardId/likes', cardsController.dislikeCard);

module.exports = cardsRouter;
