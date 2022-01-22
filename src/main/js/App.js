import React, {Component} from "react";
import ReactDOM from "react-dom";
import RegisterUser from '../../../frontend/src/components/register-user/RegisterUser';
import SearchUsers from "../../../frontend/src/components/users/SearchUsers";
import Users from '../../../frontend/src/components/users/Users';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, NavDropdown} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import '../css/styles.css';
import UserPage from "../../../frontend/src/components/users/UserPage";
import Plants from "../../../frontend/src/components/plants/Plants";
import Locations from "../../../frontend/src/components/locations/Locations";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            plants: [],
            filteredData: []
        }
    }

    componentDidMount() {
        axios.get('/user/all')
            .then(response => this.setState({users: response.data}))
    }

    removeUser = (id) => {
        axios.delete(`/user/${id}`)
            .then(() => this.setState(
                {
                    users: [...this.state.users.filter(user => user.id !== id)]
                }
                )
            );
    }

    render() {
        return (
            <div className="container">
                <Router>
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Link to="/" className='text-link'>Home</Link>
                            <Link to="/registerUser" className='text-link'>Create User </Link>
                            <Link to="/createPlant" className='text-link'>Create Plant </Link>
                            <Link to="/createLocation" className='text-link'>Create Location </Link>
                            <Link to="/searchUsers" className='text-link'>Search User </Link>
                            <Link to="/allUsers" className='text-link'>All Users </Link>
                        </Container>
                    </Navbar>
                    <Switch>
                        <Route path="/registerUser" component={RegisterUser}/>
                        <Route path="/createPlant" component={Plants}/>
                        <Route path="/createLocation" component={Locations}/>
                        <Route path="/searchUsers" component={() => <SearchUsers removeUser={this.removeUser}/>}/>
                        <Route exact path="/userPage/:id" component={(props) => <UserPage {...props} />}/>
                        <Route path="/allUsers" component={() => <Users removeUser={this.removeUser}/>}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;

ReactDOM.render(<App/>, document.querySelector("#app"));