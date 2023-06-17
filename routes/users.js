const usersRouter = require('express').Router();

const userController = require('../controllers/users');

usersRouter.get('/', userController.getUsers);
usersRouter.get('/:userId', userController.getUserById);
usersRouter.post('/', userController.createUser);

usersRouter.patch('/me', userController.updateInfo);
usersRouter.patch('/me/avatar', userController.updateAvatar);

module.exports = usersRouter;
