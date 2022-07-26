import React from "react";
import { Link } from "react-router-dom";

const TaskItem = props => (
    <tr>
        <td>{props.item.taskId}</td>
        <td>{props.item.taskName}</td>
        <td>{props.item.taskDescription}</td>
    </tr>
)

const ProjectItem = props => (
    <tr>
        <td>{props.item.projectId}</td>
        <td>{props.item.projectName}</td>
        <td>{props.item.projectStatus}</td>
        <td>{props.item.tasks.map(itemTask => {
            return <TaskItem item={itemTask} key={itemTask.taskId}/>;
        })}</td>
    </tr>
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
            {projectId: "5", projectName: "project1", usersAssigned: [], projectStatus: "not completed", totalCost: 0, tasks: [{taskId: "3", taskName: "task3", taskDescription: "description", startDate: "", endDate: "", prerequisite: [], taskStatus: "not started"}, {taskId: "4", taskName: "task4", taskDescription: "description", startDate: "", endDate: "", prerequisite: [], taskStatus: "not started"}]}] //todo get from db

        })
    }
    render(){
        return(
            <div>
                <table>
                    <tbody>
                        { this.list() }
                    </tbody>
                    
                </table>
            </div>
        );
    }
}