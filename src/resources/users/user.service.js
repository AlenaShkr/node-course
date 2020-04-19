const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const postUser = data => usersRepo.postUser(data);
const deleteUser = id => usersRepo.deleteUser(id);
const updateUser = (id, data) => usersRepo.updateUser(id, data);

module.exports = { getAll, getById, postUser, deleteUser, updateUser };
