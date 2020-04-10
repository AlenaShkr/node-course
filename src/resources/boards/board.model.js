const uuid = require('uuid');
class Board {
  constructor({ id = uuid(), title = 'title', columns = [] } = {}) {
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
