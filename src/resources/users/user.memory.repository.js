const User = require('./user.model');
const usersData = [
  new User(),
  new User(),
  new User({ id: '12' }),
  {
    id: '1234',
    name: 'Ya',
    login: 'Ya',
    password: '123'
  }
];

const getAll = async () => usersData;
const getById = async id => usersData.find(userData => userData.id === id);
const postUser = async newUser => usersData.push(newUser);
const deleteUser = id => {
  const index = usersData.findIndex(userData => userData.id === id);
  usersData.splice(index, 1);
};

module.exports = { getAll, getById, postUser, deleteUser };
