const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .populate('owner')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId).populate('owner')
    .orFail(() => {
      throw new NotFoundError('Статья не найдена');
    })
    .then((article) => {
      if (article.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Доступ запрещён');
      }
      return article.remove()
        .then(() => res.send({ data: article }));
    })
    .catch(next);
};
