const router = require('express').Router();
const loginService = require('./login.service');
const { catchError } = require('../logger/logger.module');

router.route('/').post(
  catchError(async (req, res) => {
    const token = await loginService.postLogin(req.body);
    if (token) {
      res.status(200).json(token);
    } else throw new Error(403);
  })
);

module.exports = router;
