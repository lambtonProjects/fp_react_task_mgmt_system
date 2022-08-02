const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Not Started",
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  assignee: { type: Schema.Types.ObjectId, ref: 'User' },
  project : { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  hours: {type: Number, required: false, default: 0}
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;