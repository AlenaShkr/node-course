const fs = require('fs');
const path = require('path');
const process = require('process');
const stream = require('stream');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { pipeline } = require('stream');
const { program } = require('commander');

program.storeOptionsAsProperties(false);

program
  .requiredOption('-a, --action <string>', 'encode/decode', 'encode')
  .requiredOption('-s, --shift <value>', 'shift', 7)
  .option('-i, --input <type>', 'infile')
  .option('-o, --output <filename>', 'outfile');

program.parse(process.argv);

// eslint-disable-next-line no-unused-vars
const { action, shift, input, output } = program.opts();

class EncodeTransform extends stream.Transform {
  constructor(key) {
    super();
    this.key = key;
  }
  _transform(data, encoding, callback) {
    console.log(data.toString());
    this.push(
      data
        .toString()
        .replace(/[A-Z]/g, c =>
          String.fromCharCode(((c.charCodeAt() - 65 + this.key) % 26) + 65)
        )
        .replace(/[a-z]/g, c =>
          String.fromCharCode(((c.charCodeAt() - 97 + this.key) % 26) + 97)
        )
    );
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
  transform = new EncodeTransform(shift);
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
  readStream = fs.createReadStream(pathToRead, {
    encoding: 'utf-8'
  });
  readStream.on('error', err => {
    if (err) process.stderr.write('file do not exist\n');
  });
}
if (output !== undefined) {
  const pathToWrite = path.join(__dirname, `${output}.txt`);
  writeStream = fs.createWriteStream(pathToWrite);
} else {
  writeStream = process.stdout;
}
pipeline(readStream, transform, writeStream, err => {
  if (err) {
    process.stderr.write('Something wrong');
  } else {
    console.log('Pipeline succeeded.');
  }
});
