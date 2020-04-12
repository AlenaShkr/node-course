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
const uuid = require('uuid');

// const { BAD_REQUEST, getStatusText } = require('http-status-codes');

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

// class ValidationError extends Error {
//   constructor() {
//     super();
//     this.status = BAD_REQUEST;
//     console.log(this.status);
//     this.text = getStatusText(this.status);
//   }
// }

app.use((err, req, res, next) => {
  const { method, url, params, body } = req;
  console.log(method, url, params, body);
  next(err);
});

// app.use((err, req, res, next) => {
//   if (err instanceof ValidationError) {
//     res.status(err.status).send(err.text);
//     return;
//   }
//   next(err);
// });
function clientErrorHandler(req, res, next) {
  if (!(req.param.id instanceof uuid)) {
    res.status(400).send({ error: 'Bad' });
  } else {
    return next();
  }
}

function URLErrorHandler(req, res, next) {
  // eslint-disable-next-line no-constant-condition
  if (req.url !== '/users' || '/boards') {
    console.log(req.url);
    res.status(400).send({ error: 'URL&???' });
  } else {
    return next();
  }
}

app.use(URLErrorHandler);
app.use(clientErrorHandler);

// own
app.use((err, req, res) => {
  err.status = 500;
  err.text = 'INTERNAL_SERVER_ERROR';
  console.error('oops');
  res.status(err.status).json('INTERNAL_SERVER_ERROR');
});

// app.use((err, req, res, next) => {
//   res.status(500).json('INTERNAL_SERVER_ERROR');
//   next(err);
// });

module.exports = app;
