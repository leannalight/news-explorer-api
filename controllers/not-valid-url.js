const NotFoundError = require('../errors/not-found-err');

module.exports = (req, res, next) => {
  try {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  } catch (error) {
    next(error);
  }
};