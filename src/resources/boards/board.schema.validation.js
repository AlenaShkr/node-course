const { checkSchema } = require('express-validator');

const checkParams = checkSchema({
  id: {
    in: ['params'],
    exists: {
      errorMessage: 'ID is not provided'
    },
    trim: true,
    escape: true,
    isUUID: true
  }
});

const checkBody = checkSchema({
  title: {
    in: ['body'],
    errorMessage: 'Title is not provided',
    isEmpty: false,
    trim: true,
    escape: true
  },
  columns: {
    in: ['body'],
    isArray: {
      errorMessage: 'Board should contain at least 1 column',
      options: { min: 1 }
    }
  },
  'columns.*.title': {
    in: ['body'],
    errorMessage: 'Column title is not provided',
    isEmpty: false,
    trim: true,
    escape: true
  },
  'columns.*.order': {
    in: ['body'],
    errorMessage: 'Column order should be a number',
    isInt: true
  }
});

module.exports = { checkParams, checkBody };
