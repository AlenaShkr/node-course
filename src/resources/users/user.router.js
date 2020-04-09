const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const taskService = require('../task/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  if (user) {
    res.json(User.toResponse(user));
  } else res.status(404).send({ error: "the user doesn't exist" });
});

router.route('/').post(async (req, res) => {
  const newUser = new User(req.body);
  await usersService.postUser(newUser);
  res.json(User.toResponse(newUser));
});

router.route('/:id').delete(async (req, res) => {
  usersService.deleteUser(req.params.id);
  taskService.updateTaskUserId(req.params.id);
  res.json();
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  const updateUser = User.toUpdate(user, req.body);
  await usersService.deleteUser(req.params.id);
  await usersService.postUser(updateUser);
  res.json(User.toResponse(updateUser));
});

module.exports = router;
