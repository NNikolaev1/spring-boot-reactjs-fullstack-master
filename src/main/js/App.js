import React, {Component, useCallback} from "react";
import ReactDOM, {render} from "react-dom";
import RegisterUser from '../../../frontend/src/components/register-user/RegisterUser';
import SearchUsers from "../../../frontend/src/components/users/SearchUsers";
import Users from '../../../frontend/src/components/users/Users';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import '../css/styles.css';
import UserPage from "../../../frontend/src/components/users/UserPage";
import UserInfo from "../../../frontend/src/components/user-info/UserInfo";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredData: []
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

    render() {
        return (
            <div className="container">
                <Router>
                    {/*<Link to="/registerUser">Register User </Link>*/}
                    {/*<Link to="/">Home </Link>*/}
                    <Navbar bg="light" expand="lg">
                        <Container>
                            {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                            {/*<Navbar.Toggle aria-controls="basic-navbar-nav"/>*/}
                            {/*<Navbar.Collapse id="basic-navbar-nav">*/}
                            {/*    <Nav className="me-auto">*/}

                            <Link to="/" className='text-link'>Home</Link>
                            <Link to="/registerUser" className='text-link'>Register User </Link>

                            <Link to="/searchUsers" className='text-link'>Search Users </Link>

                            <Link to="/allUsers" className='text-link'>All Users </Link>

                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <Link to="/allUsers" className='text-link'>All Users </Link>
                                <NavDropdown.Item href="/#allUsers">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Container>
                    </Navbar>
                    <Switch>
                        <Route exact path="/" component={RegisterUser}/>
                        <Route path="/registerUser" component={RegisterUser}/>
                        <Route path="/searchUsers" component={() => <SearchUsers removeUser={this.removeUser}/>}/>
                        <Route exact path="/userPage/:id" component={(props) => <UserPage {...props} />} />
                        <Route path="/allUsers" component={() => <Users removeUser={this.removeUser}/>}/>
                    </Switch>
                    {/*<Route exact path="/allUsers" component={Users}/>*/}

                    {/*<Route path="/"  component={() => <RegisterUser addUser={this.addUser}/>}/>*/}
                </Router>

                {/*<RegisterUser addUser={this.addUser}/>*/}
                {/*<Users users={this.state.users} removeUser={this.removeUser}/>*/}
            </div>
        );
    }
}

export default App;

ReactDOM.render(<App/>, document.querySelector("#app"));