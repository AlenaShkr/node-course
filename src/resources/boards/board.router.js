const router = require('express').Router();
const boardsService = require('./board.service');
const taskService = require('../task/task.service');

const { catchError } = require('../logger/logger.module');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      res.status(200).json(board);
    }
    throw new TypeError();
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const newBoard = await boardsService.postBoard(req.body);
    res.status(200).json(newBoard);
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      taskService.deleteAllTask(req.params.id);
      boardsService.deleteBoard(req.params.id);
      res.status(204).json();
    } else throw new TypeError();
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
      res.status(200).json(updateBoard);
    } else throw new TypeError();
  })
);

module.exports = router;
