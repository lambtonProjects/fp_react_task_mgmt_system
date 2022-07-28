const router = require('express').Router();
let Project = require('../models/project.model');
let Task = require('../models/task.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
//if there is param user with the user id returns the projects where the user is assigned
console.log(req.query.user)
 if(req.query.user!=undefined && req.query.user!=''){
  Project.find({users: req.query.user})
  .then(projects => res.json(projects))
  .catch(err => res.status(400).json('Error: ' + err));
 }else{
  console.log("print all")
  Project.find()
  .then(projects => res.json(projects))
  .catch(err => res.status(400).json('Error: ' + err));
 }
  
});
// not ready yet im working on it
// router.route('/calculateCost').get((req, res) => {
//   //if there is param user with the user id returns the projects where the user is assigned
//   let projectId=req.query.projectId;
//    if(projectId!=undefined && projectId!=''){
//     Task.find({project: projectId}).
//     then(tasks=>{
//       let cost=0;
//       let hours=0;
//       tasks.forEach(task=>{
//         if(task.endDate!=undefined){
//           User.findById(task.assignee).
//         }
//       })
//     }).
//     catch();

//     Project.find({users: req.query.user})
//     .then(projects => res.json(projects))
//     .catch(err => res.status(400).json('Error: ' + err));
//    }else{
//     res.status(400).json('Error: ' + "Send a valid project id")
//    }
    
//   });

router.route('/add').post((req, res) => {
  const project = req.body;
  
  const newProject = new Project(project);

  newProject.save()
    .then(() => res.json('project added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit').post((req, res) => {
  const project = req.body;
  console.log(project)

   Project.updateOne({id:project.projectId},project.edit)
   .then(() => res.json('project edited!'))
   .catch(err => res.status(400).json('Error: ' + err));

});

//Example GET Request
// http://localhost:4000/projects/addUser?user=62db87636a006bd869cf37cc&project=62db87636a006bd869cf37ca
router.route('/addUser').get((req, res) => {
  const projectId = req.query.project;
  const userId = req.query.user;
  

   Project.updateOne({id:projectId},{$addToSet:{users:userId}})
   .then(() => res.json('project edited!'))
   .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;