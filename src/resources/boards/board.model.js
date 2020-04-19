const uuid = require('uuid');
const mongoose = require('mongoose');
// class Board {
//   constructor({ id = uuid(), title = 'title', columns = [] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
//   static toUpdate(idBoard, data) {
//     const { id } = idBoard;
//     const { title, columns } = data;
//     return { id, title, columns };
//   }
// }
const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: Array,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
