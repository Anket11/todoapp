const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    listName: String,
    todoList: [String],
    doneList: [String],
    
  })
  module.exports = mongoose.model('Todo', TodoSchema);