const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findOne({ _id: id });
};

const postBoard = async data => {
  return Board.create(data);
};

const deleteBoard = async id => {
  return Board.deleteOne({ _id: id }).exec().deletedCount;
};

const updateBoard = async (id, data) => {
  return Board.updateOne({ _id: id }, data);
};

module.exports = { getAll, getById, postBoard, deleteBoard, updateBoard };
