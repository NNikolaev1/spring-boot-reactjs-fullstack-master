import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormControl, FormLabel, Table} from "react-bootstrap";
import UserInfo from "../user-info/UserInfo";

class SearchUsers extends Component {
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

    handleInputChange = event => {
        const query = event.target.value;
        if (query.length > 0) {
            this.setState(() => {
                const filteredData = this.state.users.filter(element => {
                    return element.username.toLowerCase().match(query.toLowerCase());
                });
                return {filteredData};
            });
        } else {
            this.setState(() => {
                const filteredData = [];
                return {filteredData};
            });
        }
    }

    render() {
        return (
            <div className="container">
                <form>
                    <FormLabel>Search by username:</FormLabel>
                    <FormControl type="text" id="filter" placeholder="Search for..."
                                 onChange={this.handleInputChange}/>
                </form>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.filteredData.map((user) => (
                        <UserInfo user={user} key={user.id} removeUser={this.props.removeUser}/>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default SearchUsers;