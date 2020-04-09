const Task = require('./task.model');

let taskData = [];

const getAllByBoard = async boardId =>
  taskData.filter(item => item.boardId === boardId);

const getById = async id => taskData.find(element => element.id === id);

const postTask = async (data, boardId) => {
  const newTask = new Task(data);
  newTask.boardId = boardId;
  taskData.push(newTask);
  return newTask;
};

const deleteTask = async id => {
  const index = taskData.findIndex(element => element.id === id);
  if (index !== -1) {
    taskData = taskData.filter(el => el.id !== id);
  }
  return taskData[index];
};

const deleteAllTask = async () => {
  const lenght = taskData.length;
  taskData.splice(0, lenght);
};

const updateTask = async (id, data) => {
  const task = taskData.find(item => item.id === id);
  if (task) {
    if (data.title) task.title = data.title;
    if (data.order) task.columns = data.order;
    if (data.description) task.description = data.description;
    if (data.userId) task.userId = data.userId;
    if (data.columnId) task.columnIds = data.columnId;
    if (data.boardId) task.boardIds = data.boardId;
  }
  return task;
};

const updateTaskUserId = async idUser => {
  taskData.forEach(task => {
    if (task.userId === idUser) {
      task.userId = null;
    }
  });
  return;
};

module.exports = {
  getAllByBoard,
  getById,
  postTask,
  deleteTask,
  deleteAllTask,
  updateTask,
  updateTaskUserId
};
