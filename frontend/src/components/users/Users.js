import React, {Component} from 'react';
import UserInfo from "../user-info/UserInfo";
import axios from "axios";
import {Table} from "react-bootstrap";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        axios.get('/user/all').then(response => this.setState({users: response.data}))
    }

    removeUser = (id) => {
        axios.delete(`/user/${id}`)
            .then(() => this.setState({users: [...this.state.users.filter(user => user.id !== id)]}));
    }

    render() {
        return (
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

                {this.state.users.map((user) => (
                    <UserInfo user={user} key={user.id} removeUser={this.removeUser}/>
                ))}
                </tbody>
            </Table>
        );
    }
}

export default Users;