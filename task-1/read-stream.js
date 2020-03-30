const fs = require('fs');
const path = require('path');
const process = require('process');

function defineReadStream(inputFile) {
  if (inputFile === undefined) {
    process.stdout.write('Please input some value\n');
    readStream = process.stdin;
  } else if (inputFile.match(/.txt/)) {
    const pathToRead = path.join(__dirname, `${inputFile}`);
    readStream = fs.createReadStream(pathToRead, {
      encoding: 'utf-8'
    });
  }
  return readStream;
}

module.exports = defineReadStream;