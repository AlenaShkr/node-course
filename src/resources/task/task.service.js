const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = id => tasksRepo.getById(id);

const postTask = (data, boardId) => tasksRepo.postTask(data, boardId);

const deleteTask = id => tasksRepo.deleteTask(id);

const deleteAllTask = boardId => tasksRepo.deleteAllTask(boardId);

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
