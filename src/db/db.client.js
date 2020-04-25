const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');

const User = require('../resources/users/user.model');
const users = [
  new User({ name: '1', login: '1', password: '1' }),
  new User({ name: '2', login: '2', password: '2' })
];
// const boards = [];

// const Task = require('../resources/task/task.model');
// const tasks = [
//   new Task({
//     title: 'title',
//     order: '0',
//     description: 'blablabla',
//     userId: null,
//     columnId: null,
//     boardId: null
//   })
// ];

const connectToDB = cb => {
  mongoose.connect(`${MONGO_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log('DB connected');
    await db.dropDatabase();
    users.forEach(user => user.save());
    // boards.forEach(board => board.save());
    // tasks.forEach(task => task.save());
    cb();
  });
};

module.exports = { users, connectToDB };
