const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = id => tasksRepo.getById(id);
const postTask = (data, boardId) => tasksRepo.postTask(data, boardId);
const deleteTask = id => tasksRepo.deleteTask(id);
const deleteAllTask = () => tasksRepo.deleteAllTask();
const updateTask = (id, data) => tasksRepo.updateTask(id, data);
const updateTaskUserId = idUser => tasksRepo.updateTaskUserId(idUser);

module.exports = {
  getAll,
  getById,
  postTask,
  deleteTask,
  deleteAllTask,
  updateTask,
  updateTaskUserId
};
