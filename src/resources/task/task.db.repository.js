const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getById = async id => {
  return Task.findOne({ _id: id });
};

const postTask = async (data, boardId) => {
  data.boardId = boardId;
  return Task.create(data);
};

const deleteTask = async id => {
  return Task.deleteOne({ _id: id }).exec();
};

const deleteAllTask = async boardId => {
  return Task.deleteMany({ boardId }).exec();
};

const updateTask = async (id, data) => {
  return Task.updateOne({ _id: id }, data);
};

const updateTaskUserId = async userId => {
  return Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAll,
  getById,
  postTask,
  deleteTask,
  deleteAllTask,
  updateTask,
  updateTaskUserId
};
