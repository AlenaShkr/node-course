const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const checkTokenVerify = token => {
  try {
    jwt.verify(token, JWT_SECRET_KEY);
    return true;
  } catch (err) {
    return false;
  }
};

const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json('Unauthorized');
  }
  const token = authHeader.slice(7, authHeader.length);
  const isToken = checkTokenVerify(token);
  if (!isToken) {
    return res.status(401).json('Unauthorized');
  }
  next();
};

module.exports = checkToken;
