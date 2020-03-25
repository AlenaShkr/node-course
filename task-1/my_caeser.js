const fs = require('fs');
const path = require('path');
const process = require('axios');
const stream = require('stream');
const { program } = require('commander');

program
  .requiredOption('-a, --action <string>', 'encode/decode')
  .option('-s, --shift <value>', 'shift', 1)
  .option('-i, --input <type>', 'infile')
  .option('-o, --output <filename>', 'outfile');

program.parse(process.argv);

const { action, shift, input, output } = program.opts();

class UpperCaseTransform extends stream.Transform {
  _transform(data, encoding, callback) {
    this.push(data.toString().toUpperCase());
    console.log(shift);
    callback();
  }
}

if (action === 'encode' || action === 'decode') {
  console.log(program.opts());
  if (input) {
    console.log(program.input);
    const pathToRead = path.join(__dirname, `${input}`);
    const readStream = fs.createReadStream(`${pathToRead}`, {
      encoding: 'utf8'
    });
    const transform = new UpperCaseTransform();
    if (output) {
      const pathToWrite = path.join(__dirname, `${output}.txt`);
      const write = fs.createWriteStream(pathToWrite);
      readStream.pipe(transform).pipe(write);
    } else readStream.on('data', chunk => console.log(chunk));
  }
} else {
  console.log('do not enter action');
}
