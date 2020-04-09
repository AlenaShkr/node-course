const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'title', order = '0' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({ id = uuid(), title = 'title', columns = [new Column()] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
  static toUpdate(idBoard, data) {
    const { id } = idBoard;
    const { title, columns } = data;
    return { id, title, columns };
  }
}

module.exports = Board;
