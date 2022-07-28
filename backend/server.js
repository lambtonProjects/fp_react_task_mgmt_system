const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri
    );
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");


//   --------------------------------------
//   //Example to Add data to the DB...
//   --------------------------------------
// const Task = require('./models/task.model');
// const User = require('./models/user.model');
// const Project = require('./models/project.model');
//   var testUser = new User({ username: 'user1', password: "123456", isAdmin: false });

//   testUser.save(function (err) {

//     var testProject = new Project({name: "MADT"})

//     testProject.save(function(err) {

//         var testTask = new Task({name:"Create a database", description: "The database needs to be created.", startDate: new Date(), endDate: new Date(), assignee: testUser._id, project: testProject._id});

//         testTask.save(function(err){
//             console.log(err);
//         })
//     })
    
//   });

})

const usersRouter = require('./routes/user.route');
app.use('/users', usersRouter);


const projectsRouter = require('./routes/project.route');
app.use('/projects', projectsRouter);

const tasksRouter = require('./routes/task.route');
app.use('/tasks', tasksRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});