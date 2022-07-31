import MyNavbar from "./MyNavbar";
import React, { Component } from "react";
import axios from 'axios';

export default class AddUser extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeHourlyRate = this.onChangeHourlyRate.bind(this);
        this.onChangeIsAdmin = this.onChangeIsAdmin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username : '',
            password: '',
            hourlyRate: '',
            isAdmin: false, 
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }
    onChangeHourlyRate(e){
        this.setState({
            hourlyRate: e.target.value
        });
    }
    onChangeIsAdmin(e){
        this.setState({
            isAdmin: e.target.checked
        });
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.name,
            password: this.state.password,
            hourlyRate: this.state.hourlyRate,
            isAdmin: this.state.isAdmin
        }

        axios.post('http://localhost:4000/users/add', user)
        .then(res => console.log(res.data));
       // window.location = '/';
    }

    
render(){

        return(
            <div>
                <MyNavbar />
                <div>
                        <div className="title">Create New User</div>
                        <div className="form">
                            <form onSubmit={this.onSubmit}>
                                <div className="input-container">
                                    <label>User Name </label>
                                    <input type="text" 
                                    name="uname" 
                                    required 
                                    onChange={this.onChangeName}
                                    value={this.state.name}/>
                                </div> 
                                <div className="input-container">
                                    <label>Password </label>
                                    <input type="password" 
                                    name="pass" 
                                    required 
                                    onChange={this.onChangePassword}
                                    value={this.state.password}/>
                                </div> 
                                <div className="input-container">
                                    <label>Hourly Rate </label>
                                    <input type="number" 
                                    name="rate" 
                                    required 
                                    onChange={this.onChangeHourlyRate}
                                    value={this.state.hourlyRate}/>
                                </div> 
                                <div className="input-container">
                                    <label>Is Admin? </label>
                                    <input type="checkbox" 
                                    name="isAdmin" 
                                    required 
                                    onChange={this.onChangeIsAdmin}
                                    value={this.state.isAdmin}/>
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
