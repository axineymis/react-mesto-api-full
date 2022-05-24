const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
require('dotenv').config();

const JWT_SECRET_KEY = 'test';

module.exports = (req, res, next) => {
  const cookieAuthorization = req.cookies.jwt;
  console.log(jwt.verify(cookieAuthorization, JWT_SECRET_KEY));
  // console.log('cookieAuthorization =');
  // console.log(req);
  if (!cookieAuthorization) {
    return next(new AuthorizationError('Ошибка авторизации'));
  }
  let payload;
  try {
    payload = jwt.verify(cookieAuthorization, JWT_SECRET_KEY);
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
