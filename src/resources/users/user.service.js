const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const postUser = data => usersRepo.postUser(data);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getById, postUser, deleteUser };
