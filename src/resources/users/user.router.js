const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const taskService = require('../task/task.service');

// const catchError = require('../../common/log');
// const catchError = fn => async (req, res, next) => {
//   try {
//     await fn();
//   } catch (error) {
//     // console.error(error);
//     return next(error);
//   }
// };

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    // eslint-disable-next-line no-unreachable
    res.json(users.map(User.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    if (user) {
      res.json(User.toResponse(user));
    } else res.status(404).send({ error: "the user doesn't exist" });
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newUser = await usersService.postUser(req.body);
    // eslint-disable-next-line no-unreachable
    res.json(User.toResponse(newUser));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    taskService.updateTaskUserId(req.params.id);
    usersService.deleteUser(req.params.id);
    res.json();
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = usersService.getById(req.params.id);
    if (user) {
      const updateUser = await usersService.updateUser(req.params.id, req.body);
      res.json(User.toResponse(updateUser));
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
