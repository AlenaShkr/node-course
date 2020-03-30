const process = require('process');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { pipeline } = require('stream');

const EncodeTransform = require('./transform');
const defineReadStream = require('./read-stream');
const writeStreamProcess = require('./write-stream');
const options =require('./program-option');

const { action, shift, input, output } = options;

let transform;

if (action === 'encode') {
  transform = new EncodeTransform(shift % 26);
} else if (action === 'decode') {
  transform = new EncodeTransform((26 - shift) % 26);
} else if (action !== 'encode' || action !== 'decode') {
  process.stderr.write('Input your action is wrong.\n Please, check');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}
const readStream = defineReadStream(input);
  readStream.on('error', err => {
    if (err) process.stderr.write('file don\'t exist\n');
    process.exit(1);
  });

const writeStream = writeStreamProcess(output);
pipeline(readStream, transform, writeStream, err => {
  if (err) {
    process.stderr.write('Something wrong');
  } else {
    process.stdout.write('process encoding/decoding finish successful.');
  }
});
