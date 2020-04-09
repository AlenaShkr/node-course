const Task = require('./task.model');

const taskData = [new Task({ id: '753' }), new Task()];

const getAll = async () => taskData;
const getById = async id => taskData.find(element => element.id === id);
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

const deleteAllTask = async () => {
  const lenght = taskData.length;
  taskData.splice(0, lenght);
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
