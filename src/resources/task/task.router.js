const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  console.log(boardId);
  const tasks = await tasksService.getAllByBoard(boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (task) {
    res.json(task);
  } else res.status(404).send({ error: "the task doesn't exist" });
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.postTask(req.body, boardId);
  res.json(tasks);
});

router.route('/:id').delete(async (req, res) => {
  const task = await tasksService.deleteTask(req.params.id);
  if (task) {
    res.status(204).json();
  } else res.status(404).send({ error: "the task doesn't exist" });
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  const updateTask = await tasksService.updateTask(req.params.id, req.body);
  if (task) {
    res.json(updateTask);
  } else res.status(404).send({ error: "the task doesn't exist" });
});

module.exports = router;
