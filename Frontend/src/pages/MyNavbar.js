import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function MyNavbar() {
  const name = localStorage.getItem("name");
  let navigate = useNavigate(); 
  const handleLogout = () => {
      localStorage.clear();
      redirect()
  }

  const redirect = () => {
      navigate('/login', { replace: true });
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/listUsers">Users</Nav.Link>
            <Nav.Link href="/listTask">Task</Nav.Link>
            <Nav.Link href="/list">Projects</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/addProject">Add Project</NavDropdown.Item>
              <NavDropdown.Item href="/addUser">Add User</NavDropdown.Item>
              <NavDropdown.Item href="/addTask">Add Task</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Navbar.Text>Signed in as: {name} &nbsp;</Navbar.Text>
            <Button onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;