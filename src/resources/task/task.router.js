const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { catchError } = require('../logger/logger.module');

router.route('/').get(
  catchError(async (req, res) => {
    const id = req.params.boardId;
    const tasks = await tasksService.getAll(id);
    res.status(200).json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const task = await tasksService.getById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else throw new TypeError();
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const id = req.params.boardId;
    const tasks = await tasksService.postTask(req.body, id);
    res.json(tasks);
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    await tasksService.deleteTask(req.params.id);
    res.status(204).json();
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const task = await tasksService.getById(req.params.id);
    if (task) {
      const updateTask = await tasksService.updateTask(task, req.body);
      res.json(updateTask);
    } else throw new TypeError();
  })
);

module.exports = router;
