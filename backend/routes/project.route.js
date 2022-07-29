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

router.route('/calculateCost').get((req, res) => {

  let projectId=req.query.projectId;
   if(projectId!=undefined && projectId!=''){
    calculateCost(projectId).then(result=>{
    console.log('result sent'+result)
    res.json(result)}).
    catch(err => res.status(400).json('Error: ' + err));
    
    
   }else{
    res.status(400).json('Error: ' + "Send a valid project id")
   }
    
  });
  router.route('/sortByCost').get((req, res) => {
    let OrderedList=[]
    Project.find()
    .then(projects => {
      let idx=projects.length;
      console.log("lenght "+idx)
    if(idx>0){
      projects.forEach(project=>{
        console.log("Called here")
        calculateCost(project.id).then(result=>{
          console.log(project.id+" :::: "+result)
          console.log(idx)
          idx--;
          OrderedList.push({"project":project,"cost":result.total})
          if(idx==0){
            console.log(OrderedList)
            res.json(OrderedList.sort(comparatorDown))
          }
        }).
          catch(err => res.status(400).json('Error: ' + err));
          
      })
    }
      // res.json(projects)
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
    
      
    });

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


 async function calculateCost(projectId){
  console.log("called")
  return new Promise(result =>{
    Task.find({project: projectId}).
  then(tasks=>{
    
    let cost=0;
    let hours=0;
    let idx=tasks.length;
    if(idx>0){
    tasks.forEach(task=>{
      let hourlyRate;
      let taskHours;
      if(task.endDate!=undefined){
        User.findById(task.assignee).then(
          user=>{
            console.log(user)
            hourlyRate=user.hourlyRate
            taskHours=Math.abs(task.endDate - task.startDate) / 36e5;
            hours+=taskHours;
            cost+=(hourlyRate*taskHours)
            idx--;
            if(idx==0){
            let final={"total":cost,"hours":hours}
            console.log("answered")
            result(final)
            }
          }
        ).catch(err=>{
          console.log("answered err")
    throw(err)
        })
      }else{
        idx--;
        if(idx==0){
          let final={"total":cost,"hours":hours}
          console.log("answered")
          result(final)
          }
      }
      
    })
  }else{
    let final={"total":cost,"hours":hours}
    console.log("answered")
    result(final)
  }
    
  }).
  catch(err => {
    console.log("answered err")
    throw(err)});

  }

  );
  
}

function comparatorUp(a, b) {

  let comparison = 0;
  if (a.cost > b.cost) {
      comparison = 1;
  } else if (a.cost < b.cost) {
      comparison = -1;
  }
  return comparison;
}
function comparatorDown(a, b) {

  let comparison = 0;
  if (a.cost > b.cost) {
      comparison = -1;
  } else if (a.cost < b.cost) {
      comparison = 1;
  }
  return comparison;
}

module.exports = router;