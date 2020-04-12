const User = require('./user.model');
const usersData = [new User()];

const getAll = async () => usersData;

const getById = async id => usersData.find(userData => userData.id === id);

const postUser = async data => {
  const newUser = new User(data);
  usersData.push(newUser);
  return newUser;
};

const deleteUser = id => {
  const index = usersData.findIndex(userData => userData.id === id);
  usersData.splice(index, 1);
};

const updateUser = (id, data) => {
  const { name, login, password } = data;
  const user = usersData.find(item => item.id === id);
  if (user) {
    if (name) user.name = name;
    if (login) user.login = login;
    if (password) user.password = password;
  }
  return user;
};
module.exports = { getAll, getById, postUser, deleteUser, updateUser };
