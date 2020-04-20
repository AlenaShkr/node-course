const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const taskService = require('../task/task.service');

const { catchError } = require('../logger/logger.module');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    }
    throw new TypeError();
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const newBoard = await boardsService.postBoard(req.body);
    res.status(200).json(Board.toResponse(newBoard));
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const isDel = await boardsService.deleteBoard(req.params.id);
    if (isDel !== 0) {
      taskService.deleteAllTask(req.params.id);
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
      res.status(200).json(Board.toResponse(updateBoard));
    } else throw new TypeError();
  })
);

module.exports = router;
