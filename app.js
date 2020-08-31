require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGODB_URL } = require('./config');

const { errorHandler } = require('./middlewares/error-handler');

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://newsapi.org',
    'https://nomoreparties.co',
    'http://explorenews.tk', 'http://wwww.explorenews.tk',
    'https://explorenews.tk', 'https://wwww.explorenews.tk',
    'https://leannalight.github.io/news-explorer-frontend',
    'https://leannalight.github.io'],
  credentials: true,
  methods: 'GET,POST,DELETE', /*
  allowedHeaders: ['Content-Type', 'Authorization'] */
};

app.use(cors(corsOptions));

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
