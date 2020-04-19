const Task = require('./task.model');

// const taskData = [...require('../../db/db.client').tasks];

const getAll = async boardId => {
  return Task.find({ _id: boardId });
  // taskData.filter(item => item.boardId === boardId);
};

const getById = async id => {
  return Task.findOne({ _id: id });
  // const task = taskData.find(element => element.id === id);
  // return task;
};

const postTask = async (data, boardId) => {
  return Task.create(data).updateOne({ _id: data.id }, boardId);
};

const deleteTask = async id => {
  return Task.deleteOne({ _id: id }).exec().deletedCount;
};

const deleteAllTask = async boardId => {
  return Task.deleteMany({ boardId: !boardId }).exec().deletedCount;
  // taskData = taskData.filter(item => item.boardId !== boardId);
  // return;
};

const updateTask = async (id, data) => {
  return Task.updateOne({ _id: id }, data);
};

const updateTaskUserId = async idUser => {
  return Task.find({ userId: idUser }).updateOne({ userId: idUser }, null);
  // let index = taskData.findIndex(element => element.userId === idUser);
  // while (index !== -1) {
  //   taskData[index].userId = null;
  //   index = taskData.findIndex(element => element.userId === idUser);
  // }
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
