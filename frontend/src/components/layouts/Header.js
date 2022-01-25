import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Container, Navbar} from "react-bootstrap";
import RegisterUser from "../register-user/RegisterUser";
import Plants from "../plants/Plants";
import Locations from "../locations/Locations";
import SearchUsers from "../users/SearchUsers";
import UserPage from "../users/UserPage";
import Users from "../users/Users";
import PlantPage from "../plants/PlantPage";

function Header() {
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
                    <Route path="/searchUsers" component={() => <SearchUsers/>}/>
                    <Route exact path="/userPage/:id" component={(props) => <UserPage {...props} />}/>
                    <Route exact path="/plantPage/:id" component={(props) => <PlantPage {...props} />}/>
                    <Route path="/allUsers" component={() => <Users/>}/>
                </Switch>
            </Router>
        </div>
    );
}

export default Header;