import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import MyNavbar from "./MyNavbar";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Moment from 'moment';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function ListUsers() {
    let navigate = useNavigate(); 
    const [userList, setUserList] = useState([])
    const handleAddUsers = () => {
        redirect()
    }
  
    const redirect = () => {
        navigate('/addTask', { replace: true });
    }
  
    useEffect(() => {
        refreshUserList();
    }, [])

    function refreshUserList() {
        const UserAPI = axios.get('http://localhost:4000/users/')
            .then(res => setUserList(res.data))
            .catch(err => console.log(err))
    }

  return (
    <div>
        <MyNavbar />
        <Container fluid>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Username</th>
            <th>is Admin?</th>
            </tr>
        </thead>
        <tbody>
        {
            userList.map((user,i) => (
            <tr key={i}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.isAdmin ? 'yes' : 'no'}</td>
            </tr>
            ))
            }
        </tbody>
        </Table>
        <Button variant="primary" size="sm" onClick={handleAddUsers}>
          Add Users
        </Button>{' '}
        </Container>
    </div>
  );
}

export default ListUsers;