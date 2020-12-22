const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const taskService = require('../task/task.service');

const { catchError } = require('../logger/logger.module');

const { checkParams, checkBody } = require('./board.schema.validation');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  checkParams,
  catchError(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    }
    throw new TypeError();
  })
);

router.route('/').post(
  checkBody,
  catchError(async (req, res) => {
    const newBoard = await boardsService.postBoard(req.body);
    res.status(200).json(Board.toResponse(newBoard));
  })
);

router.route('/:id').delete(
  checkParams,
  catchError(async (req, res) => {
    const isDel = await boardsService.deleteBoard(req.params.id);
    if (isDel.ok !== 0) {
      const isDelTask = await taskService.deleteAllTask(req.params.id);
      if (isDelTask.ok !== 0) {
        res.status(204).json();
      } else throw new TypeError();
    } else throw new TypeError();
  })
);

router.route('/:id').put(
  [...checkParams, ...checkBody],
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
