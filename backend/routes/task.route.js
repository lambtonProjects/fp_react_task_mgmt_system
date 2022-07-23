const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;