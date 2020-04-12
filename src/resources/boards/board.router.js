const router = require('express').Router();
const boardsService = require('./board.service');
const taskService = require('../task/task.service');

const { catchError } = require('../logger/logger.module');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      res.json(board);
    } else res.status(404).send({ error: "the board doesn't exist" });
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const newBoard = await boardsService.postBoard(req.body);
    res.json(newBoard);
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const board = boardsService.getById(req.params.id);
    if (board) {
      taskService.deleteAllTask(req.params.id);
      boardsService.deleteBoard(req.params.id);
      res.status(204).json();
    } else res.status(404).send({ error: "the board doesn't exist" });
  })
);

router.route('/:id').put(
  catchError(async (req, res) => {
    const board = boardsService.getById(req.params.id);
    if (board) {
      const updateBoard = await boardsService.updateBoard(
        req.params.id,
        req.body
      );
      res.json(updateBoard);
    } else res.status(404).send({ error: "the board doesn't exist" });
  })
);

module.exports = router;
