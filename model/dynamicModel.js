const mongoose = require('mongoose');

const taskTwoSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const TaskTwoModel = mongoose.model('TaskTwoModel', taskTwoSchema);
module.exports = TaskTwoModel;

