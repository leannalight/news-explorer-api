const router = require('express').Router();

const { getArticles, createArticle, deleteArticleById } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:articleId', deleteArticleById);

module.exports = router;
