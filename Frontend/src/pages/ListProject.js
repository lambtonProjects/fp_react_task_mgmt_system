import React from "react";
import MyNavbar from "./MyNavbar";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


const ProjectItem = props => {

     return(
     
         <div>
         <Card style={{ margin: '1rem', padding: '1rem' }}>
            <Card.Title>{props.item.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.item._id}</Card.Subtitle>
            <Card.Text>Status: {props.item.status}</Card.Text>
            <Card.Text hidden={props.item.status === "Not Completed"}>Total Cost: {
                props.item.cost
            }</Card.Text>
            <CardGroup>
                    { props.item.tasks.map(item => {
            return <TaskItem item={item} key={item._id} />;
        }) }
        </CardGroup>
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

 
export default class ListProject extends React.Component {
 

     constructor(props) {
        super(props);

        this.state = {
            projectList: [],
            taskList:[],
            users: [],
        }

    };

    list(){ 
        return this.state.projectList.map(item => {
        return <ProjectItem item={item} key={item._id} />;
    }) 
}

findUserRate(id){
    let rate = this.state.users.filter(user => user._id === id)[0].hourlyRate;
    console.log(rate);
    return rate;
}

    componentDidMount(){
        axios.get('http://localhost:4000/tasks/')
        .then(res => this.setState({
            taskList: res.data.map(task => task),
        }))
        .catch(err => console.log(err))
        
        axios.get('http://localhost:4000/users/')
        .then(res => this.setState({
            users: res.data.map(user => user),
        }))
        .catch(err => console.log(err))
        
        axios.get('http://localhost:4000/projects/')
        .then(res => {
            let updArray = res.data;
                updArray.map(proj => {
                    proj.tasks = (this.state.taskList.filter(task => task.project === proj._id))
                    proj.status = (proj.tasks.filter(task => task.status !== "Completed").length === 0? "Completed": "Not Completed")
                    console.log(proj.status)
                    console.log(proj.tasks)
                    proj.allUsers = this.state.users.map(user => user)
                    proj.cost = (proj.status === "Completed")?(proj.tasks.reduce(function (accumulator, task) {
                    let rate = proj.allUsers.filter(user => user._id === task.assignee)[0].hourlyRate;
                    return accumulator + (Number(task.hours) * rate); //todo add 
                        
                      }, 0)):0
                })

                this.setState({
                    projectList: updArray
                }) 
                //console.log(this.state.projectList);

        })
        .catch(err => console.log(err))

    }

render(){
    return (
    <div>
        <MyNavbar />
        <CardGroup>
            { this.list() }
            
        </CardGroup>
    </div>
  )
}
  
}
