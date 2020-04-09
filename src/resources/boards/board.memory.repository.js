const Board = require('./board.model');
const boardsData = [
  new Board(),
  new Board({ id: '12' }),
  new Board({ id: '12012' })
];

const getAll = async () => boardsData;
const getById = async id => boardsData.find(element => element.id === id);
const postBoard = async data => {
  const newBoard = new Board(data);
  boardsData.push(newBoard);
  return newBoard;
};
const deleteBoard = async id => {
  const index = boardsData.findIndex(element => element.id === id);
  boardsData.splice(index, 1);
};

const updateBoard = async (id, data) => {
  const board = boardsData.find(element => element.id === id);
  const upd = Board.toUpdate(board, data);
  const index = boardsData.findIndex(element => element.id === id);
  boardsData.splice(index, 1);
  const newBoard = new Board(upd);
  boardsData.push(newBoard);
  return newBoard;
};

module.exports = { getAll, getById, postBoard, deleteBoard, updateBoard };
