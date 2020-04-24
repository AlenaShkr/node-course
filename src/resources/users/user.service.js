const bcrypt = require('bcrypt');
const saltRounds = 10;

const usersRepo = require('./user.db.repository');
const taskService = require('../task/task.service');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const postUser = async data => {
  const hash = await bcrypt.hash(data.password, saltRounds);
  return usersRepo.postUser({ ...data, password: hash });
};
const deleteUser = id => {
  taskService.updateTaskUserId(id);
  return usersRepo.deleteUser(id);
};
const updateUser = async (id, data) => {
  const hash = await bcrypt.hash(data.password, saltRounds);
  return usersRepo.updateUser(id, { ...data, password: hash });
};

module.exports = { getAll, getById, postUser, deleteUser, updateUser };
