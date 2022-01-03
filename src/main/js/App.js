import React, {Component, useCallback} from "react";
import ReactDOM, {render} from "react-dom";
import Header from '../../../frontend/src/components/layouts/Header';
import RegisterUser from '../../../frontend/src/components/register-user/RegisterUser';
import Users from '../../../frontend/src/components/users/Users';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('/user/all')
            .then(response => this.setState({users: response.data}))
    }

    //Deleting User
    removeUser = (id) => {
        axios.delete(`/user/${id}`)
            .then(
                response => this.setState( //Updating UI
                    {
                        users: [...this.state.users.filter(
                            user => user.id !== id
                        )]
                    }
                )
            );
    }

    addUser = (newUser) => {
        axios.post('/user/save', newUser)
            .then(
                (response) => {
                    console.log(response.data);
                    this.setState({users: [...this.state.users, response.data]})
                }
            );
    }

    // element = <RegisterUser addUser={this.addUser}/>;

    render() {
        return (
            <div className="container">
                <Header/>
                <Router>
                    <Route path="/registerUser"  component={() => <RegisterUser addUser={this.addUser}/>}/>

                    <Link to="/registerUser">Register User </Link>
                    <Link to="/">Home </Link>
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home">Home</Nav.Link>
                                    <Nav.Link href="#RegisterUser">Link</Nav.Link>
                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Router>
                {/*<RegisterUser addUser={this.addUser}/>*/}
                <Users users={this.state.users} removeUser={this.removeUser}/>
            </div>
        );
    }
}


export default App;

ReactDOM.render(<App/>, document.querySelector("#app"));