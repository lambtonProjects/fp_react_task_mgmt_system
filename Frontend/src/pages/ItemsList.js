import React from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import MyNavbar from "./MyNavbar";
import axios from 'axios';


const TaskItem = props => (
    
        <div>
        <Card style={{ margin: '1rem', padding: '1rem' }}>
        <Card.Title>{props.item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.item._id}</Card.Subtitle>
        <Card.Text>{props.item.description}</Card.Text>
        <Card.Text>Status: {props.item.status}</Card.Text>
        <Card.Text>Start Date: {props.item.startDate}</Card.Text>
        <Card.Text>End Date: {props.item.endDate}</Card.Text>
        <Card.Text>Assigned to: {props.item.assignee}</Card.Text>
        <Card.Text>Project: {props.item.project}</Card.Text>
        <Button variant="primary" hidden={(props.item.status === "Completed")? true:false} onClick={() => {
            if(props.item.status === "Not Started"){
                // change status to started
                const task = {
                    id: props.item._id,
                    name: props.item.name,
                    description: props.item.description,
                    status: "Started",
                    startDate: props.item.startDate,
                    endDate: props.item.endDate,
                    assignee: props.item.assignee,
                    project: props.item.project,
                }
        
                axios.post('http://localhost:4000/tasks/edit', task)
                .then(res => console.log(res.data));
                
                window.location.reload(false);
            } else if (props.item.status === "Started") {
                //todo change status to completed
                //todo show message about hours
                //todo save hours of work

            }
            
        }} >{(props.item.status == "Not Started")?"Start Task":"Complete Task"}</Button> 
        </Card>
    </div>

     
)


export default class ItemsList extends React.Component{

    constructor(props) {
        super(props);

        this.onChangeStatus = this.onChangeStatus.bind(this);

        this.state = {
            list: [],
            tasks:[],
            isAdmin: true
        }
    };

    onChangeStatus(e){
        console.log("from function");
        this.setState({
            //status: e.target.value //target is a textbox
        });
    }
    list(){
        return this.state.list.map(item => {
            return <TaskItem item={item} key={item._id} user={this.state.isAdmin}/>;
        })
    }
    componentDidMount(){

        axios.get('http://localhost:4000/tasks/')
        .then(res => {
         if(res.data.length > 0){
             this.setState({
                 tasks: res.data.map(task => task),
                 list: this.state.tasks, //todo filter tasks for not admin user
             })
         }
        })
        //todo check current user status (isAdmin?)

    }

    render(){
        return(
            <div>
                <MyNavbar />
                <CardGroup>
                    { this.list() }
                </CardGroup>
            </div>
        );
    }
}