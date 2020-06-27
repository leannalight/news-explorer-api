const router = require('express').Router();
const auth = require('../middlewares/auth');

const { getArticles, createArticle, deleteArticleById } = require('../controllers/articles');

router.get('/', auth, getArticles);
router.post('/', auth, createArticle);
router.delete('/:articleId', deleteArticleById);

module.exports = router;
