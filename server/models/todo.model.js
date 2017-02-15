"use strict"

const mongoose = require('mongoose');
var Schema     = mongoose.Schema;

var todosSchema = new Schema({
  task: { type: String, required: true},
  status: { type: Boolean, require: true}
},
{
  timestamps : true
})

var Todos = mongoose.model('Todos', todosSchema)

module.exports = Todos;
