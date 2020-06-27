const router = require('express').Router();

const userRouter = require('./users');
const articleRouter = require('./articles');
const authRouter = require('./auth');

router.use('/', userRouter);
router.use('/', articleRouter);
router.use('/', authRouter);

module.exports = router;
