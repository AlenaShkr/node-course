const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'title',
    order = '0',
    description = 'blablabla',
    userId = '123',
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
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
  static toUpdate(idData, data) {
    const { id, boardId } = idData;
    const { title, order, description, userId, columnId } = data;
    return { id, title, order, description, userId, columnId, boardId };
  }
}

module.exports = Task;
