import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

const TaskItem = props => (
        <div>
        <Card style={{ margin: '1rem', padding: '1rem' }}>
        <Card.Title>{props.item.taskName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.item.taskId}</Card.Subtitle>
        <Card.Text>{props.item.taskDescription}</Card.Text>
        <Card.Text>Status: {props.item.taskStatus}</Card.Text>
        <Card.Text>Start Date: {props.item.startDate}</Card.Text>
        <Card.Text>End Date: {props.item.endDate}</Card.Text>
        <Button variant="primary" visible='false'>{(props.item.taskStatus == "not started")?"Start Task":"Complete Task"}</Button> 
        </Card>
    </div>

     
)

const ProjectItem = props => (
    <div>
        <Card style={{ margin: '1rem', padding: '1rem'  }}>
        <Card.Title>{props.item.projectName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.item.projectId}</Card.Subtitle>
        <Card.Text>Status: {props.item.projectStatus}</Card.Text>
        <CardGroup>{props.item.tasks.map(itemTask => {
            return <TaskItem item={itemTask} key={itemTask.taskId}/>;
        })} </CardGroup>
        </Card>
    </div>
)

export default class ItemsList extends React.Component{

    constructor(props) {
        super(props);

        this.onChangeStatus = this.onChangeStatus.bind(this);

        this.state = {
            // username: '', //todo etc
            list: [],
        }
    };

    onChangeStatus(e){
        this.setState({
            //status: e.target.value //target is a textbox
        });
    }
    list(){
        return this.state.list.map(item => {
            return <ProjectItem item={item} key={item.projectId}/>;
        })
    }
    componentDidMount(){
        this.setState({
           //todo get real projects list and filter only projects that user assigned  to them
           list: [{projectId: "4", projectName: "project1", usersAssigned: [], projectStatus: "not completed", totalCost: 0, tasks: [{taskId: "1", taskName: "task1", taskDescription: "description", startDate: "", endDate: "", prerequisite: [], taskStatus: "not started"}, {taskId: "2", taskName: "task2", taskDescription: "description", startDate: "", endDate: "", prerequisite: [], taskStatus: "not started"}]},
            {projectId: "5", projectName: "project2", usersAssigned: [], projectStatus: "not started", totalCost: 0, tasks: [{taskId: "3", taskName: "task3", taskDescription: "description", startDate: "", endDate: "", prerequisite: [], taskStatus: "not completed"}, {taskId: "4", taskName: "task4", taskDescription: "description", startDate: "", endDate: "", prerequisite: [], taskStatus: "not started"}, {taskId: "5", taskName: "task5", taskDescription: "description", startDate: "", endDate: "", prerequisite: [], taskStatus: "not started"}]}] //todo get from db

        })
    }
    render(){
        return(
            <div>
                <CardGroup>
                    { this.list() }
                </CardGroup>
                        
                 
            </div>
        );
    }
}