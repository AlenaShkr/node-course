const router = require('express').Router();
const boardsService = require('./board.service');
const taskService = require('../task/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (board) {
    res.json(board);
  } else res.status(404).send({ error: "the board doesn't exist" });
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.postBoard(req.body);
  res.json(newBoard);
});

router.route('/:id').delete(async (req, res) => {
  const board = boardsService.getById(req.params.id);
  if (board) {
    taskService.deleteAllTask(req.params.id);
    boardsService.deleteBoard(req.params.id);
    res.status(204).json();
  } else res.status(404).send({ error: "the board doesn't exist" });
});

router.route('/:id').put(async (req, res) => {
  const board = boardsService.getById(req.params.id);
  if (board) {
    const updateBoard = await boardsService.updateBoard(
      req.params.id,
      req.body
    );
    res.json(updateBoard);
  } else res.status(404).send({ error: "the board doesn't exist" });
});

module.exports = router;
