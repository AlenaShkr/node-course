const stream = require('stream');
module.exports = class EncodeTransform extends stream.Transform {
  constructor(value) {
    super();
    this.value = value;
  }
  _transform(data, encoding, callback) {
    this.push(
      data
        .toString()
        .replace(/[A-Z]/g, c =>
          String.fromCharCode(((c.charCodeAt() - 65 + this.value) % 26) + 65)
        )
        .replace(/[a-z]/g, c =>
          String.fromCharCode(((c.charCodeAt() - 97 + this.value) % 26) + 97)
        )
    );
    callback();
  }
};
