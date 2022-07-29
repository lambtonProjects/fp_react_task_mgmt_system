const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});


//EXAMPLE REQUEST FOR ADD
// {
//   "startDate":"2013-10-21T13:28:06.419Z",
//   "name": "Test Task Name",
//   "description": "Hello World....",
//   "assignee": "62db87636a006bd869cf37ca",
//   "project": "62db87636a006bd869cf37cd"
// }

router.route('/add').post((req, res) => {
  const task = req.body;
  
  const newTask = new Task(task);

  newTask.save()
    .then(() => res.json('task is added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//EXAMPLE REQUEST
// {
//   "id": "62e3161c7c4f0ebbd0937442",
//   "startDate":"2013-10-21T13:28:06.419Z",
//   "name": "Test Task Name Edit.....",
//   "description": "Hello World....",
//   "assignee": "62db87636a006bd869cf37ca",
//   "project": "62db87636a006bd869cf37cd"
// }
router.route('/edit').post((req, res) => {
  const task = req.body;
  console.log(task)

   Task.updateOne({_id:task.id}, {$set:task})
   .then(() => res.json('task edited!'))
   .catch(err => res.status(400).json('Error: ' + err));

});


// Example GET Request
// http://localhost:4000/tasks/assign?user=62db84c3052c8ea56d34cd28&task=62e3161c7c4f0ebbd0937442
router.route('/assign').get((req, res) => {
  const userId = req.query.user;
  const taskId = req.query.task;

   Task.updateOne({_id:taskId}, {$set:{assignee:userId}})
   .then(() => res.json('user is assigned to the task!'))
   .catch(err => res.status(400).json('Error: ' + err));

});



module.exports = router;