const fs = require('fs');
const path = require('path');
const process = require('process');

function writeStreamProcess(outputFile) {
  if (outputFile !== undefined) {
    const pathToWrite = path.join(__dirname, `${outputFile}`);
    return fs.createWriteStream(pathToWrite, {flags: 'a'});
  } else {
    return process.stdout;
  }
}

module.exports = writeStreamProcess;