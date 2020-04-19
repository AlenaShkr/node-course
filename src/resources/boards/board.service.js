const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const postBoard = data => boardsRepo.postBoard(data);
const deleteBoard = id => boardsRepo.deleteBoard(id);
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);

module.exports = { getAll, getById, postBoard, deleteBoard, updateBoard };
