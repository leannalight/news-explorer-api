const router = require('express').Router();

const notValidUrl = require('../controllers/not-valid-url');
const userRouter = require('./users');
const articleRouter = require('./articles');
const authRouter = require('./auth');

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('*', notValidUrl);

module.exports = router;
