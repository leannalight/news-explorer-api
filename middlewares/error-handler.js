const mongoose = require('mongoose');

module.exports.errorHandler = (error, req, res, next) => {
  let { statusCode = 500, message } = error;

  if
  (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    statusCode = 400;
  }
  if (error.code === 11000) {
    statusCode = 409;
    message = 'Данный email уже зарегистрирован';
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка' : message,
  });
};
