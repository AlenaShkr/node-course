const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
morgan.token('reqbody', (req, res) => JSON.stringify(req.body));
// eslint-disable-next-line no-unused-vars
morgan.token('params', (req, res) => JSON.stringify(req.params));

const log = fs.createWriteStream(path.join(__dirname, '../../log/access.log'), {
  flags: 'a'
});
const errorLog = fs.createWriteStream(
  path.join(__dirname, '../../log/error.log'),
  {
    flags: 'a'
  }
);

const formatMorgan =
  'date: :date[web]   ":method :url"  status: :status  params: :params body: :reqbody referrer: ":referrer" ';
const loggerToConsole = morgan(formatMorgan);

const loggerLogToFile = morgan(formatMorgan, {
  skip(req, res) {
    return res.statusCode > 400;
  },
  stream: log
});

const loggerErrorToFile = morgan(formatMorgan, {
  skip(req, res) {
    return res.statusCode < 400;
  },
  stream: errorLog
});

// handlers for log errors
const catchError = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

function URLErrorHandler(req, res, next) {
  if (req.url !== '/users' || req.url !== '/boards') {
    res.status(400).send({ error: 'BAD_REQUEST' });
  } else {
    return next();
  }
}

function notFoundHandler(err, req, res, next) {
  if (err instanceof TypeError) {
    err.status = 404;
    err.text = 'Not found';
    res.status(err.status).send(err.text);
    return;
  }
  next(err);
}

const commonErrorHandler = (err, req, res, next) => {
  res.status(500).json('INTERNAL_SERVER_ERROR');
  next(err);
};

module.exports = {
  loggerToConsole,
  loggerLogToFile,
  loggerErrorToFile,
  catchError,
  URLErrorHandler,
  notFoundHandler,
  commonErrorHandler
};
