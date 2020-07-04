const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { ArtNotFoundMsg } = require('../constants/constants');
const { AccessDeniedMsg } = require('../constants/constants');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ article: article.withoutOwner() }))
    .catch(next);
};

module.exports.getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId).populate('owner')
    .orFail(() => {
      throw new NotFoundError(ArtNotFoundMsg);
    })
    .then((article) => {
      if (article.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(AccessDeniedMsg);
      }
      return article.remove()
        .then(() => res.send({ article: article.withoutOwner() }));
    })
    .catch(next);
};
