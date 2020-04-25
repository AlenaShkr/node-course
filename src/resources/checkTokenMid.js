const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const checkTokenVerify = token => {
  try {
    console.log(`/n${token}`);
    jwt.verify(token, JWT_SECRET_KEY);
    console.log(`/n ${jwt.verify(token, JWT_SECRET_KEY)}`);

    return true;
  } catch (err) {
    return false;
  }
};

const checkToken = (req, res, next) => {
  const authHeader = JSON.stringify(req.headers.authorization);
  if (!authHeader) {
    return res.status(401).json('Unauthorized');
  }
  const token = authHeader.slice(8, -1);
  const isToken = checkTokenVerify(token);
  if (!isToken) {
    return res.status(401).json('Unauthorized');
  }
  next();
};

module.exports = checkToken;
