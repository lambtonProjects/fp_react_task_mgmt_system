import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import MyNavbar from "./MyNavbar";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';




const TaskItem = props => {
   const showModal = () => {
    setShow(true);
      };
    
      const hideModal = () => {
        setShow(false);
      };
      const hideModalAndSave = () => {
        setShow(false);
        console.log(hours);

        const task = {
                    id: props.item._id,
                    name: props.item.name,
                    description: props.item.description,
                    status: "Completed",
                    startDate: props.item.startDate,
                    endDate: props.item.endDate,
                    assignee: props.item.assignee,
                    project: props.item.project,
                    hours: hours
                }
        
                axios.post('http://localhost:4000/tasks/edit', task)
                .then(res => console.log(res.data));
                
                window.location.reload(false);
        
      };

      const [hours, setHours] = useState(0);
      const onChangeHours=(e)=>{
        setHours(e.target.value);
    }

    const [show, setShow] = useState(false);

    return(
    
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
                setShow(true);
            }
            
        }} >{(props.item.status == "Not Started")?"Start Task":"Complete Task"}</Button> 
        <Card.Text hidden={props.item.status !== "Completed"} >Hours: {props.item.hours}</Card.Text>
        </Card>
        <Modal show={show} onHide={hideModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Complete task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <input 
                        type="number"
                        name="hours"
                        placeholder="hours"
                        onChange={onChangeHours}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>Close</Button>
                    <Button variant="primary" onClick={hideModalAndSave}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
        
    </div>

     
)}


export default class ItemsList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            tasks:[],
            isAdmin: true,
            currentUserId: ""
        }

    };


    list(){
        return this.state.list.map(item => {
            return <TaskItem item={item} key={item._id} user={this.state.isAdmin} />;
        })
    }
    componentDidMount(){
        this.state.isAdmin = (localStorage.getItem("isAdmin") === "true");
        this.state.currentUserId = localStorage.getItem("id")

        axios.get('http://localhost:4000/tasks/')
        .then(res => {
         if(res.data.length > 0){
             this.setState({
                 tasks: res.data.map(task => task),
                 list: (this.state.isAdmin)?this.state.tasks: res.data.filter(task => task.assignee === this.state.currentUserId),
             })
         }
        })
       

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