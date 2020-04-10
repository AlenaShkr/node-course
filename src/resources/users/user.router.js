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
  const newUser = await usersService.postUser(req.body);
  res.json(User.toResponse(newUser));
});

router.route('/:id').delete(async (req, res) => {
  taskService.updateTaskUserId(req.params.id);
  usersService.deleteUser(req.params.id);
  res.json();
});

router.route('/:id').put(async (req, res) => {
  const user = usersService.getById(req.params.id);
  if (user) {
    const updateUser = await usersService.updateUser(req.params.id, req.body);
    res.json(User.toResponse(updateUser));
  }
});

module.exports = router;
