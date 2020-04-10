const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const id = req.params.boardId;
  console.log(id);
  const tasks = await tasksService.getAll(id);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (task) {
    res.status(200).json(task);
  } else res.status(404).send({ error: "the task doesn't exist" });
});

router.route('/').post(async (req, res) => {
  const id = req.params.boardId;
  const tasks = await tasksService.postTask(req.body, id);
  res.json(tasks);
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.deleteTask(req.params.id);
  res.status(204).json();
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (task) {
    const updateTask = await tasksService.updateTask(task, req.body);
    res.json(updateTask);
  } else res.status(404).send({ error: "the task doesn't exist" });
});

module.exports = router;
