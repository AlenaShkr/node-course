const fs = require('fs');
const path = require('path');
const process = require('process');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { pipeline } = require('stream');
// const { program } = require('commander');

const EncodeTransform = require('./transform');
const writeStreamProcess = require('./write-stream');
const options =require('./program-option');

const { action, shift, input, output } = options;

let transform;
let readStream;

if (action === 'encode') {
  transform = new EncodeTransform(shift % 26);
} else if (action === 'decode') {
  transform = new EncodeTransform((26 - shift) % 26);
} else if (action !== 'encode' || action !== 'decode') {
  process.stderr.write('wrong action');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}
if (input === undefined) {
  readStream = process.stdin;
} else if (input.match(/.txt/)) {
  const pathToRead = path.join(__dirname, `${input}`);
  readStream = fs.createReadStream(pathToRead, {
    encoding: 'utf-8'
  });
  readStream.on('error', err => {
    if (err) process.stderr.write('file do not exist\n');
  });
}
const writeStream = writeStreamProcess(output);
pipeline(readStream, transform, writeStream, err => {
  if (err) {
    process.stderr.write('Something wrong');
  } else {
    console.log('process encoding/decoding finish successful.');
  }
});
