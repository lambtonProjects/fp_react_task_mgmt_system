const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  users: [mongoose.Types.ObjectId],
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;