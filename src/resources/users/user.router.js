const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

const { catchError } = require('../logger/logger.module');

router.route('/').get(
  catchError(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const newUser = await usersService.postUser(req.body);
    res.json(User.toResponse(newUser));
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const isDel = await usersService.deleteUser(req.params.id);
    if (isDel.ok !== 0) {
      res.status(204).json();
    } else throw new TypeError();
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const updateUser = await usersService.updateUser(req.params.id, req.body);
    res.json(User.toResponse(updateUser));
  })
);

module.exports = router;
