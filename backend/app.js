const express = require('express');

const app = express();

const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3001 } = process.env;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// роуты, не требующие авторизации
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorCatcher = require('./errors/errorCatcher');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
  'https://localhost:3001',
  'https://domainname.axineymis.nomoredomains.xyz',
  'http://domainname.axineymis.nomoredomains.xyz',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
  }),
}), createUser);

app.use(auth);
app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('По указанному пути ничего нет'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorCatcher);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
