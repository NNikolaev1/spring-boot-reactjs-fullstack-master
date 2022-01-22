import React, {Component} from 'react';
import {Button, Form, FormLabel, FormControl, FormGroup, Table, FloatingLabel, FormSelect} from "react-bootstrap";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";

class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newLocation: '',
            locations: [],
            unAssignedPlants: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        axios.get('/plant/unassigned')
            .then(response => this.setState({unAssignedPlants: response.data}))
    }

    handleChange(e) {
        const plantFound = this.state.unAssignedPlants.filter(plant => {
            return plant.id.toString() === e.target.value
        });
        axios.put(`/location/${1}`, plantFound[0])
            .then(response => this.setState({
                // user: response.data,
                unAssignedPlants: this.state.unAssignedPlants.filter(el => el.id !== plantFound[0].id)
            }));
    }

    addLocation = (newLocation) => {
        axios.post('/location/save', newLocation)
            .then(response => this.setState({
                locations: [...this.state.locations, response.data],
                newLocation: response.data
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
                        <th>Plants</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.locations.map((location) => (
                        <tr>
                            <td>
                            </td>
                            <td>{location.name}</td>
                            {/*<td>{location.plants}</td>*/}
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