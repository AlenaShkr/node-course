const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../resources/users/user.model');
// eslint-disable-next-line no-sync
const hash = bcrypt.hashSync('admin', 10);
const users = [new User({ name: '1', login: 'admin', password: hash })];

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
    cb();
  });
};

module.exports = { users, connectToDB };
