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


    componentDidMount(){
        axios.get('http://localhost:4000/tasks/')
        .then(res => this.setState({
            taskList: res.data.map(task => task),
        }))
        .catch(err => console.log(err))
        
        axios.get('http://localhost:4000/users/')
        .then(res => this.setState({
            tasks: res.data.map(user => user),
        }))
        .catch(err => console.log(err))
        
        axios.get('http://localhost:4000/projects/')
        .then(res => {
            let updArray = res.data;
                updArray.map(proj => {
                    proj.tasks = (this.state.taskList.filter(task => task.project === proj._id))
                    proj.status = (proj.tasks.filter(task => task.status !== "Completed").length === 0? "Completed": "Not Completed")
                    proj.cost = proj.tasks.reduce(function (accumulator, task) {
                        return accumulator + (Number(task.hours) * 5); //todo add 
                        
                      }, 0);
                })

                this.setState({
                    projectList: updArray
                }) 
                console.log(this.state.projectList);

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
