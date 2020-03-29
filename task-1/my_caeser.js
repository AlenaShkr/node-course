const fs = require('fs');
const path = require('path');
const process = require('process');
const stream = require('stream');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { pipeline } = require('stream');
const { program } = require('commander');

program.storeOptionsAsProperties(false);

program
  .requiredOption('-a, --action <string>', 'encode/decode')
  .requiredOption('-s, --shift <value>', 'shift')
  .option('-i, --input <type>', 'infile')
  .option('-o, --output <filename>', 'outfile');

program.parse(process.argv);

// eslint-disable-next-line no-unused-vars
const { action, shift, input, output } = program.opts();

class EncodeTransform extends stream.Transform {
  _transform(data, encoding, callback) {
    this.push(data.toString().toUpperCase());
    callback();
  }
}

class DecodeTransform extends stream.Transform {
  _transform(data, encoding, callback) {
    this.push(data.toString().toLowerCase());
    callback();
  }
}

let transform;
let readStream;
let writeStream;

if (action === 'encode') {
  transform = new EncodeTransform();
} else if (action === 'decode') {
  transform = new DecodeTransform();
} else if (action !== 'encode' || action !== 'decode') {
  process.stderr.write('wrong action');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}
if (input === undefined) {
  readStream = process.stdin;
} else if (input.match(/.txt/)) {
  const pathToRead = path.join(__dirname, `${input}`);
  readStream = fs.createReadStream(`${pathToRead}`, {
    encoding: 'utf8'
  });
}
if (output !== undefined) {
  const pathToWrite = path.join(__dirname, `${output}.txt`);
  writeStream = fs.createWriteStream(pathToWrite);

  pipeline(readStream, transform, writeStream, err => {
    if (err) {
      process.stderr.write('input file do not exist');
    } else {
      console.log('Pipeline succeeded.');
    }
  });
} else {
  writeStream = process.stdout;
  pipeline(readStream, transform, writeStream, err => {
    if (err) {
      process.stderr.write('input file do not exist');
    } else {
      process.stdout.write('Pipeline succeeded.');
    }
  });
}
