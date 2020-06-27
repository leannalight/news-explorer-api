const router = require('express').Router();
const auth = require('../middlewares/auth');

const { getUser } = require('../controllers/users');

router.get('/:me', auth, getUser);

module.exports = router;
