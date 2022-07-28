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
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: [],
    unique: true
  }]
}, {
  timestamps: true,
});

projectSchema.pre('save', function (next) {
  this.users = _.uniq(this.users);
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;