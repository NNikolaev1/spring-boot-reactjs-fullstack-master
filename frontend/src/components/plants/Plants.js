import React, {Component} from 'react';
import {Button, Form, FormLabel, FormControl, FormGroup, Table} from "react-bootstrap";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";

class Plants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: []
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        //Copying state object to newPlant
        let newPlant = this.state;
        this.addPlant(newPlant);
        //Resetting the fields
        e.target.reset();
    }

    componentDidMount() {
        axios.get('/plant/all')
            .then(response => this.setState({plants: response.data}))
    }

    addPlant = (newPlant) => {
        axios.post('/plant/save', newPlant)
            .then(response => this.setState({plants: [...this.state.plants, response.data]}))
    }

    removePlant = (id) => {
        axios.delete(`/plant/${id}`)
            .then(() => this.setState({
                    plants: [...this.state.plants.filter(
                        plant => plant.id !== id
                    )]
                })
            );
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup className="mb-3" controlId="formBasicEmail">
                    <FormLabel> Name </FormLabel>
                    <FormControl name="name" placeholder="Enter name" onChange={this.onChange}/>
                </FormGroup>
                <FormGroup className="mb-3" controlId="formBasicEmail">
                    <FormLabel>Location</FormLabel>
                    <FormControl name="location" placeholder="Enter location" onChange={this.onChange}/>
                </FormGroup>
                <Button variant="primary" type="submit" onChange={this.onChange}>
                    Submit
                </Button>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Location</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.plants.map((plant) => (
                        <tr>
                            <td>
                            </td>
                            <td>{plant.name}</td>
                            <td>{plant.location}</td>
                            <td>{plant.quantity}</td>
                            <td><IconButton color="secondary" onClick={(e) => this.removePlant(plant.id, e)}>
                                <DeleteIcon/>
                            </IconButton></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Form>

        )
    }
}

export default Plants;