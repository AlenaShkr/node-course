const usersRepo = require('./user.memory.repository');
const taskService = require('../task/task.service');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const postUser = data => usersRepo.postUser(data);
const deleteUser = async id => {
  await taskService.updateTaskUserId(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getById, postUser, deleteUser };
