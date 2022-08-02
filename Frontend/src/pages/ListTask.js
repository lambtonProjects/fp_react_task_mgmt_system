import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Table from 'react-bootstrap/Table';
import MyNavbar from "./MyNavbar";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

function ListTask() {
    let navigate = useNavigate(); 
    const [taskList, setTaskList] = useState([])
    const [task, setTask] = useState(null);
    const [show, setShow] = useState(false);
    const {setError, handleSubmit, control, reset, formState: {errors}, getValues} = useForm();
    
    const onSubmit = (data, e) => {
      //Prevent page reload
      e.preventDefault();
      const taska = {
        id: task._id,
        name: data.name,
        description: data.description,
        status: data.statusVal.value,
        startDate: task.startDate,
        endDate: task.endDate,
        assignee: task.assignee,
        project: task.project,
        hours: task.hours
      }
      
      axios.post('http://localhost:4000/tasks/edit', taska)
      .then(res => {
        console.log(res.data)
      }).catch(err => console.log(err));
      
      window.location.reload(false);
      setShow(false);
      setTask(null);
    };
    const onError = (errors, e) => console.log(errors, e);


    const handleClose = () => {
        setShow(false);
        setTask(null);
        console.log("button clicked");
    };
    
    const handleShow = (task) => { 
        setTask(task)
        let defaultValues = {};
        if(task){
            defaultValues.name = task.name;
            defaultValues.description = task.description;
            defaultValues.statusVal = { value: task.status, label: task.status };
        }
        reset({ ...defaultValues });
        setShow(true);}

    const handleAddTask = () => {
        redirect()
    }
  
    const redirect = () => {
        navigate('/addTask', { replace: true });
    }
  
    useEffect(() => {
        refreshTaskList();
    }, [])

    function refreshTaskList() {
        const TaskAPI = axios.get('http://localhost:4000/tasks/')
            .then(res => setTaskList(res.data))
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
            <th>Name</th>
            <th>Description</th>
            <th>Assignee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
        {
            taskList.map((task,i) => (
            <tr key={i}>
                <td>{task._id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.assignee}</td>
                <td>{Moment(task.startDate).format('DD-MM-YYYY')}</td>
                <td>{Moment(task.endDate).format('DD-MM-YYYY')}</td>
                <td>{task.status}</td>
                <td><Button variant="primary" size="sm" onClick={() => handleShow(task)}>Edit Task</Button>{' '}</td>
            </tr>
            ))
            }
        </tbody>
        </Table>
        <Button variant="primary" size="sm" onClick={handleAddTask}>
          Add Task
        </Button>{' '}
        </Container>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Controller control={control} name="name" defaultValue="" render={({ field: { onChange, onBlur, value, ref } }) => (
                <Form.Control onChange={onChange} value={value} ref={ref} isInvalid={errors.username} placeholder="Name" />)} />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Controller control={control} name="description" defaultValue="" render={({ field: { onChange, onBlur, value, ref } }) => (
                <Form.Control onChange={onChange} value={value} ref={ref} isInvalid={errors.username} placeholder="Description" />)} />
                <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Controller
                    name="statusVal"
                    control={control}
                    render={({ field }) => (
                    <ReactSelect
                        isClearable
                        {...field}
                        options={[
                        { value: "Not Started", label: "Not Started" },
                        { value: "Started", label: "Started" },
                        { value: "Completed", label: "Completed" }
                        ]}
                    />
                    )}
                />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListTask;