const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'title',
    order = '0',
    description = 'blablabla',
    userId = null,
    columnId = null,
    boardId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
    this.boardId = boardId;
  }
  static toResponse(task) {
    const { id, title, order, description, userId, columnId, boardId } = task;
    return { id, title, order, description, userId, columnId, boardId };
  }

  static toUpdate(idData, data) {
    const { id, boardId } = idData;
    const { title, order, description, userId, columnId } = data;
    return { id, title, order, description, userId, columnId, boardId };
  }
}

module.exports = Task;
