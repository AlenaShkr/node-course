const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findById(id);
};

const postBoard = async data => {
  return Board.create(data);
};

const deleteBoard = async id => {
  return Board.deleteOne({ _id: id }).exec();
};

const updateBoard = async (id, data) => {
  return Board.findByIdAndUpdate(id, data, { new: true });
};

module.exports = { getAll, getById, postBoard, deleteBoard, updateBoard };
