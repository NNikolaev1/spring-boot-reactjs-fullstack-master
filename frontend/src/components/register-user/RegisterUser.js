import React, {Component} from 'react';
import {Button, Form, FormLabel, FormControl, FormGroup} from "react-bootstrap";
import axios from "axios";

class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    onChange = (e) => {
        //This is what you do for individual target
        //this.setState({name:e.target.value});
        //But if you have plenty
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let newUser = this.state;
        this.addUser(newUser);
        e.target.reset();
    }

    addUser = (newUser) => {
        axios.post('/user/save', newUser);
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup className="mb-3" controlId="formBasicEmail">
                    <FormLabel>Email address</FormLabel>
                    <FormControl name="email" placeholder="Enter email" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup className="mb-3" controlId="floatingInputCustom">
                    <FormLabel> Name </FormLabel>
                    <FormControl name="username" placeholder="Enter name" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup className="mb-3" controlId="formBasicPassword">
                    <FormLabel>Password</FormLabel>
                    <FormControl name="password" placeholder="Password" onChange={this.onChange}/>
                </FormGroup>
                <Button variant="primary" type="submit" onChange={this.onChange}>
                    Submit
                </Button>
            </Form>
        )
    }
}

export default RegisterUser;