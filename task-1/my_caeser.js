const fs = require('fs');
const path = require('path');
const process = require('process');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { pipeline } = require('stream');
const { program } = require('commander');

const EncodeTransform = require('./transform');

program.storeOptionsAsProperties(false);

program
  .requiredOption('-a, --action <string>', 'encode/decode')
  .requiredOption('-s, --shift <value>', 'shift')
  .option('-i, --input <type>', 'infile')
  .option('-o, --output <filename>', 'outfile');

program.parse(process.argv);

const { action, shift, input, output } = program.opts();

let transform;
let readStream;
let writeStream;

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
if (output !== undefined) {
  const pathToWrite = path.join(__dirname, `${output}`);
  writeStream = fs.createWriteStream(pathToWrite, {flags: 'a'});
} else {
  writeStream = process.stdout;
}
pipeline(readStream, transform, writeStream, err => {
  if (err) {
    process.stderr.write('Something wrong');
  } else {
    console.log('process encoding/decoding finish successful.');
  }
});
