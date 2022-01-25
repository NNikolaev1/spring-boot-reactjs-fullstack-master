import React, {Component} from 'react';
import {Button, Form, FormLabel, FormControl, FormGroup, Table} from "react-bootstrap";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import QRCodeGeneration from "../plants/QRCodeGeneration";

class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let newLocation = this.state;
        this.addLocation(newLocation);
        e.target.reset();
    }

    componentDidMount() {
        axios.get('/location/all')
            .then(response => this.setState({locations: response.data}))
    }

    addLocation = (newLocation) => {
        axios.post('/location/save', newLocation)
            .then(response => this.setState({
                locations: [...this.state.locations, response.data],
            }))
    }

    removeLocation = (id) => {
        axios.delete(`/location/${id}`)
            .then(() => this.setState({
                    locations: [...this.state.locations.filter(
                        location => location.id !== id
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
                <Button variant="primary" type="submit" onChange={this.onChange}>
                    Submit
                </Button>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Location name</th>
                        <th>Plants assigned to this location</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.locations.map((location) => (
                        <tr>
                            <td>
                            </td>
                            <td>{location.name}</td>

                            <td>
                                <QRCodeGeneration id={location.id}/>
                            </td>

                            {location.plants && location.plants.map((plant) => (
                                <div>{plant.name} </div>
                            ))}
                            <td><IconButton color="secondary" onClick={(e) => this.removeLocation(location.id, e)}>
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

export default Locations;