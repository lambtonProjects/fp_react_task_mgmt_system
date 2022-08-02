const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  if (req.query.username == '' || req.query.username == undefined) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else {
    User.findOne({username:new RegExp(`^${req.query.username}$`, 'i') }).then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  }


});

router.route('/add').post((req, res) => {
  const user = req.body;

  const newUser = new User(user);

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;