const usersRouter = require('express').Router();

const userController = require('../controllers/users');

usersRouter.get('/', userController.getUsers);
usersRouter.get('/me', userController.getMyInfo);

usersRouter.get('/:userId', userController.getUserById);

usersRouter.patch('/me', userController.updateInfo);
usersRouter.patch('/me/avatar', userController.updateAvatar);

module.exports = usersRouter;
