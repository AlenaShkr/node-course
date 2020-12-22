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

module.exports = { checkParams };
