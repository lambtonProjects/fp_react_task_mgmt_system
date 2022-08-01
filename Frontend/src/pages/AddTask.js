import MyNavbar from "./MyNavbar";
import React, { Component } from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class AddTask extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeAssignee = this.onChangeAssignee.bind(this);
        this.onChangeProject = this.onChangeProject.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            name : '',
            description: '',
            status: "Not Started",
            startDate: new Date(), 
            endDate: new Date(),
            assignee: '',
            project: '',
            statusList: ["Not Started", "Started", "Completed"],
            projectsList: [],
            membersList:[]
        }
    }

    componentDidMount(){
       axios.get('http://localhost:4000/users/')
       .then(res => {
        if(res.data.length > 0){
            this.setState({
                membersList: res.data.map(user => user._id)
            })
        }
       }) 

       axios.get('http://localhost:4000/projects/')
       .then(res => {
        if(res.data.length > 0){
            this.setState({
                projectsList: res.data.map(project => project._id)
            })
        }
       }) 
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }
    onChangeStatus(e){
        this.setState({
            status: e.target.value
        });
    }
    onChangeStartDate(date){
        this.setState({
            startDate: date
        });
    }
    onChangeEndDate(date){
        this.setState({
            endDate: date
        });
    }
    onChangeAssignee(e){
        this.setState({
            assignee: e.target.value
        });
    }
    onChangeProject(e){
        this.setState({
            project: e.target.value
        });
    }
  

    onSubmit(e){
        e.preventDefault();
        const task = {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            assignee: this.state.assignee,
            project: this.state.project,
        }

        console.log(task);
        axios.post('http://localhost:4000/tasks/add', task)
        .then(res => console.log(res.data));
        window.location = '/';
    }

    
render(){

        return(
            <div>
                <MyNavbar />
                <div>
                        <div className="title">Create New Task</div>
                        <div className="form">
                            <form onSubmit={this.onSubmit}>
                                <div className="input-container">
                                    <label>Task Name </label>
                                    <input type="text" 
                                    name="uname" 
                                    required 
                                    onChange={this.onChangeName}
                                    value={this.state.name}/>
                                </div> 
                                <div className="input-container">
                                    <label>Description </label>
                                    <input type="text" 
                                    name="description" 
                                    required 
                                    onChange={this.onChangeDescription}
                                    value={this.state.description}/>
                                </div> 
                                <div className="input-container">
                                    <label>Status </label>
                                    <select ref="userInput"
                                    className="form-control" 
                                    required 
                                    onChange={this.onChangeStatus}
                                    value={this.state.status}>
                                        {
                                            this.state.statusList.map(function(status){
                                                return <option
                                                key={status}
                                                value={status}
                                                >{status}</option>
                                            })
                                        }
                                    </select>
                                </div> 
                                <div className="form-group">
                                    <label>Start Date </label>
                                    <div>
                                        {/* <DatePicker 
                                        selected={this.state.startDate} 
                                        onChange={this.onChangeStartDate} /> */}
                                    </div>    
                                </div> 
                                <div className="form-group">
                                    <label>End Date </label>
                                    <div>
                                        {/* <DatePicker 
                                        selected={this.state.endDate} 
                                        onChange={this.onChangeEndDate} /> */}
                                    </div>    
                                </div> 
                              
                                <div className="input-container">
                                    <label>Assigne to </label>
                                    <select ref="assign"
                                    className="form-control" 
                                    required 
                                    onChange={this.onChangeAssignee}
                                    value={this.state.assignee}>
                                        {
                                            this.state.membersList.map(function(user){
                                                return <option
                                                key={user}
                                                value={user}
                                                >{user}</option>
                                            })
                                        }
                                    </select>
                                </div> 
                                <div className="input-container">
                                    <label>Project </label>
                                    <select ref="project"
                                    className="form-control" 
                                    required 
                                    onChange={this.onChangeProject}
                                    value={this.state.project}>
                                        {
                                            this.state.projectsList.map(function(project){
                                                return <option
                                                key={project}
                                                value={project}
                                                >{project}</option>
                                            })
                                        }
                                    </select>
                                </div> 
                                <div className="button-container">
                                    <input type="submit" value="Create" />
                                </div>
                                
                            </form>
                        </div>
                 
                 </div>
                        
                 
            </div>
        );
}
    
}
