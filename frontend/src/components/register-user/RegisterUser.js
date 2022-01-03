import React, {Component, useRef, useState} from 'react';
import {Button, Form, FormLabel, FormControl, FormGroup} from "react-bootstrap";

class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        }

        //If you dont use arrow function you will have to manually bind like this
        //If you dont bind you wont be able to access items in the state of this component because it wont be recognised in lifecycle
        //this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        //This is what you do for individual target
        //this.setState({name:e.target.value});
        //But if you have plenty
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        //Copying state object to newUser
        let newUser = this.state;
        this.props.addUser(newUser);
        //Resetting the fields
        e.target.reset();
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup className="mb-3" controlId="formBasicEmail">
                    <FormLabel>Email address</FormLabel>
                    <FormControl name="email" placeholder="Enter email" onChange={this.onChange}/>
                </FormGroup>

                <FormGroup className="mb-3" controlId="formBasicEmail">
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