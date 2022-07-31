import MyNavbar from "./MyNavbar";
import React, { Component } from "react";
import axios from 'axios';

export default class AddProject extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            name : '',
            users: [], 
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const project = {
            name: this.state.name,
            users: this.state.users,
        }

        axios.post('http://localhost:3000/projects/add', project)
        .then(res => console.log(res.data));
        window.location = '/';
    }

    
render(){

        return(
            <div>
                <MyNavbar />
                <div>
                        <div className="title">Create New Project</div>
                        <div className="form">
                            <form onSubmit={this.onSubmit}>
                                <div className="input-container">
                                <label>Project Name </label>
                                <input type="text" 
                                name="pname" 
                                required 
                                onChange={this.onChangeName}
                                value={this.state.name}/>
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
