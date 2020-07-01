const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

module.exports.getUserbyId = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};
