const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const { ServerCannotProcessMsg } = require('../constants/constants');

const { PrivateKey } = require('../config');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({ user: user.omitPrivate() }))
    .catch(next);
};
/* // ВАриант 1
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, PrivateKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      return res.send({ token });
    })
    .catch(next);
};
*/ /* // Вариант 2
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userlogin = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: userlogin._id }, PrivateKey, { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 1, // срок жизни куки 1 день
      httpOnly: true,
      sameSite: 'none', // требования браузера при кросс-доменных запросах
      secure: true, // требования браузера при кросс-доменных запросах
      domain: 'explorenews.tk',
    });
    res.send({ token });
    } catch(error) {
      return next(error);
  }
}; */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, PrivateKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 2, // срок жизни куки 2 дня
        httpOnly: true,
        sameSite: 'none', // требования браузера при кросс-доменных запросах
        secure: true, // требования браузера при кросс-доменных запросах
      });
      return res.send({ token });
    })
    .catch(next);
};
// удаляем куки, чтобы выйти / logout
module.exports.removeCookie = (req, res, next) => {
  res.cookie('jwt', '', {
    maxAge: -1,
    httpOnly: true,
  });
  res.send({ message: 'Выход успешен' })
  .catch((error) => next(new BadRequestError(error.message)));
}