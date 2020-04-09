// const User = require('./user.model');
let usersData = [];

const getAll = async () => usersData;
const getById = async id => usersData.find(userData => userData.id === id);
const postUser = async newUser => usersData.push(newUser);

const deleteUser = id => {
  const user = usersData.find(item => item.id === id);
  if (user) {
    usersData = usersData.filter(item => item.id !== id);
  }
  return user;
};

module.exports = { getAll, getById, postUser, deleteUser };
