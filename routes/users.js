const usersRouter = require('express').Router();

const userController = require('../controllers/users');
const { validateUserInfo, validateUserAvatar } = require('../middlewares/valiadation');

usersRouter.get('/', userController.getUsers);
usersRouter.get('/me', userController.getMyInfo);

usersRouter.get('/:userId', userController.getUserById);

usersRouter.patch('/me', validateUserInfo, userController.updateInfo);
usersRouter.patch('/me/avatar', validateUserAvatar, userController.updateAvatar);

module.exports = usersRouter;
