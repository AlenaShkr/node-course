const mongoose = require('mongoose');

const User = require('../resources/users/user.model');
const users = [
  new User({ name: '1', login: '1', password: '1' }),
  new User({ name: '2', login: '2', password: '2' })
];

const connectToDB = cb => {
  mongoose.connect(
    'mongodb+srv://admin:admin@node-course-nospl.mongodb.net/rest-api?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected');
    // db.dropDatabase();
    users.forEach(user => user.save());
    cb();
  });
};

module.exports = { users, connectToDB };
