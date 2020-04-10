const Board = require('./board.model');
let boardsData = [];

const getAll = async () => boardsData;

const getById = async id => boardsData.find(element => element.id === id);

const postBoard = async data => {
  const newBoard = new Board(data);
  boardsData.push(newBoard);
  return newBoard;
};

const deleteBoard = async id => {
  const board = boardsData.find(item => item.id === id);
  if (board) {
    boardsData = boardsData.filter(item => item.id !== id);
  }
};

const updateBoard = async (id, data) => {
  const board = boardsData.find(element => element.id === id);
  const { title, columns } = data;
  if (board) {
    if (title) board.title = title;
    if (columns) board.columns = columns;
  }
  return board;
};

module.exports = { getAll, getById, postBoard, deleteBoard, updateBoard };
