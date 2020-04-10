const Task = require('./task.model');

let taskData = [];

const getAll = async boardId =>
  taskData.filter(item => item.boardId === boardId);

const getById = async id => {
  const task = taskData.find(element => element.id === id);
  return task;
};

const postTask = async (data, boardId) => {
  const newTask = new Task(data);
  newTask.boardId = boardId;
  taskData.push(newTask);
  return newTask;
};

const deleteTask = async id => {
  const index = taskData.findIndex(element => element.id === id);
  taskData.splice(index, 1);
};

const deleteAllTask = async boardId => {
  taskData = taskData.filter(item => item.boardId !== boardId);
  return;
};

const updateTask = async (id, data) => {
  const updTask = Task.toUpdate(id, data);
  const boardId = data.boardId;
  deleteTask(id);
  postTask(updTask, boardId);
  return updTask;
};

const updateTaskUserId = async idUser => {
  let index = taskData.findIndex(element => element.userId === idUser);
  while (index !== -1) {
    taskData[index].userId = null;
    index = taskData.findIndex(element => element.userId === idUser);
  }
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
