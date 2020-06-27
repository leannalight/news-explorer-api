const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { errorHandler } = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-err');

const app = express();
const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB has started ...'))
  .catch((error) => console.log(error));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);
app.use(errorLogger);
app.use(errors());

app.all('*', (req, res, next) => {
  try {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
