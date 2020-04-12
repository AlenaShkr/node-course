const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/task/task.router');
const {
  loggerToConsole,
  loggerLogToFile,
  loggerErrorToFile
} = require('./resources/logger/logger.module');

const app = express();

app.use(loggerToConsole);
app.use(loggerLogToFile);
app.use(loggerErrorToFile);

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

function URLErrorHandler(req, res, next) {
  if (req.url !== '/users' || req.url !== '/boards') {
    res.status(400).send({ error: 'BAD_REQUEST' });
  } else {
    return next();
  }
}

app.use(URLErrorHandler);

app.use((err, req, res, next) => {
  if (err instanceof TypeError) {
    err.status = 404;
    err.text = 'Not found';
    res.status(err.status).send(err.text);
    return;
  }
  next(err);
});

// internal_server_error
app.use((err, req, res, next) => {
  res.status(500).json('INTERNAL_SERVER_ERROR');
  next(err);
});

process.on('uncaughtException', error => {
  console.error(`captured error: ${error.message}`);
  const { exit } = process;
  exit(1);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  const { exit } = process;
  exit(1);
});

module.exports = app;
