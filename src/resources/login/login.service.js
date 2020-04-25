const userRepo = require('../users/user.db.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const postLogin = async data => {
  const user = await userRepo.getByLogin(data.login);
  if (!user) return false;
  const compareResult = await bcrypt.compare(data.password, user.password);
  if (!compareResult) return false;
  return jwt.sign(data, JWT_SECRET_KEY);
};

module.exports = { postLogin };
