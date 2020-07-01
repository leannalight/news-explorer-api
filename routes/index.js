const router = require('express').Router();

const userRouter = require('./users');
const articleRouter = require('./articles');
const authRouter = require('./auth');

router.use('/', authRouter);

router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = router;
