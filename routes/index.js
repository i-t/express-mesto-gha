const router = require('express').Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

module.exports = router;
