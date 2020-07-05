const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const { getArticles, createArticle, deleteArticleById } = require('../controllers/articles');

const urlValidate = (link) => {
  if (!validator.isURL(link)) {
    throw new Error('invalid link');
  }
  return link;
};

router.get('/', auth, getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(urlValidate),
    image: Joi.string().required().custom(urlValidate),
  }),
}), auth, createArticle);

router.delete('/:articleId', celebrate({
  body: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), auth, deleteArticleById);

module.exports = router;
