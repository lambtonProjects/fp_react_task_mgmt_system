import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import MyNavbar from "./MyNavbar";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


const ProjectItem = props => {

     return(
     
         <div>
         <Card style={{ margin: '1rem', padding: '1rem' }}>
            <Card.Title>{props.item.project.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.item.project._id}</Card.Subtitle>
            <Card.Text>Status: {props.item.project.status}</Card.Text>
            <Card.Text hidden={props.item.status === "Not Completed"}>Total Cost: ${
                props.item.cost.toFixed(2)
            }</Card.Text>
            {/* <CardGroup>
                    { props.item.tasks.map(item => {
            return <TaskItem item={item} key={item.project_id} />;
        }) }
        </CardGroup> */}
         </Card>
         
     </div>
 
      
 )}

 const TaskItem = props => {

    return(
    
        <div>
        <Card style={{ margin: '1rem', padding: '1rem' }}>
           <Card.Title>{props.item.name}</Card.Title>
           <Card.Subtitle className="mb-2 text-muted">{props.item._id}</Card.Subtitle>
           <Card.Text>Status: {props.item.status}</Card.Text>
          
        </Card>
        
    </div>

     
)}

 
function ListProject() {
     const [projectList, setProjectsList] = useState([])
     const [taskList, setTaskList] = useState([])
     const [users, setUsersList] = useState([])
     //const [updProjectList, setUpdList] = useState([])



    useEffect(() => {
        refreshProjectsList();
    }, [])

    function refreshProjectsList() {
        axios.get('http://localhost:4000/projects/sortByCost')
        .then(res => {
            console.log(res.data)
            setProjectsList(res.data)
        })
        .catch(err => console.log(err))

            // axios.get('http://localhost:4000/tasks/')
            // .then(res => setTaskList(res.data))
            // .catch(err => console.log(err)).then(
            //     axios.get('http://localhost:4000/users/')
            // .then(res => setUsersList(res.data))
            // .catch(err => console.log(err))).then(
            //     axios.get('http://localhost:4000/projects/')
            // .then(res => {
            //     let updArray = res.data;
            //         updArray.map(proj => {
            //             proj.tasks = (taskList.filter(task => task.project === proj._id))
            //             proj.status = (proj.tasks.filter(task => task.status !== "Completed").length === 0? "Completed": "Not Completed")
            //             proj.cost = proj.tasks.reduce(function (accumulator, task) {
            //                 return accumulator + (Number(task.hours) * 5); //todo add user value
                            
            //               }, 0);
            //         })
            //         setProjectsList(updArray);
            // })
            // .catch(err => console.log(err))).then(
            //     console.log(projectList)
            // )
    }

  return (
    <div>
        <MyNavbar />
        <CardGroup>
            
                    { projectList.map(item => {
            return <ProjectItem item={item} key={item.project._id} />;
        }) }
        </CardGroup>
    </div>
  );
}

export default ListProject;