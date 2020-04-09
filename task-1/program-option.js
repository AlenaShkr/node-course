const { program } = require('commander');

program.storeOptionsAsProperties(false);

program
  .requiredOption('-a, --action <string>', 'encode/decode')
  .requiredOption('-s, --shift <value>', 'shift')
  .option('-i, --input <type>', 'infile')
  .option('-o, --output <filename>', 'outfile');

program.parse(process.argv);

const options = program.opts();

module.exports = options;
