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
  loggerErrorToFile,
  URLErrorHandler,
  notFoundHandler,
  commonErrorHandler
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

app.use(URLErrorHandler);
app.use(notFoundHandler);
// internal_server_error
app.use(commonErrorHandler);

module.exports = app;
