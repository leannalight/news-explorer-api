const NotFoundError = require('../errors/not-found-err');
const { NotFoundMsg } = require('../constants/constants');

module.exports = (req, res, next) => {
  try {
    throw new NotFoundError(NotFoundMsg);
  } catch (error) {
    next(error);
  }
};
