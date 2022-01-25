import React, {Component} from 'react';
import {Button, Form, FormLabel, FormControl, FormGroup, Table, FormSelect, Alert} from "react-bootstrap";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import ScanPlant from "./ScanPlant";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {Link} from "react-router-dom";

class Plants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: [],
            locations: [],
            location: '',
            showErrorMessage: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.selectLocation = this.selectLocation.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let newPlant = this.state;
        newPlant.location = this.state.location[0];
        this.addPlant(newPlant);
        e.target.reset();
    }

    selectLocation(e) {
        this.setState({
            location: this.state.locations.filter(location => {
                return location.id.toString() === e.target.value
            })
        });
    }

    componentDidMount() {
        axios.get('/plant/all')
            .then(response => {
                this.setState({plants: response.data})
            })
        axios.get('/location/all')
            .then(response => this.setState({locations: response.data}))
    }

    addPlant = (newPlant) => {
        axios.post('/plant/save', newPlant)
            .then(response => this.setState({plants: [...this.state.plants, response.data]}))
            .catch(err => this.setState({showErrorMessage: true}));
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
                <FormGroup className="mb-3">
                    <FormLabel> Name </FormLabel>
                    <FormControl name="name" placeholder="Enter name" onChange={this.onChange}/>
                </FormGroup>
                <FormLabel> Location </FormLabel>
                <FormSelect onChange={this.selectLocation}>
                    <option>Select from the unassigned locations</option>
                    {this.state.locations.map((location) =>
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    )}
                </FormSelect>
                <br/>

                {this.state.showErrorMessage &&
                <Alert key="danger" variant="danger" onClose={() => this.setState({showErrorMessage: false})}
                       dismissible>
                    There was a problem creating the plant please enter correctly all the required data!
                </Alert>
                }

                <Button variant="primary" type="submit" onChange={this.onChange}>
                    Submit
                </Button>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Plant name</th>
                        <th>Location</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.plants.map((plant) => {
                        const location = this.state.locations.filter(loc => {
                            return loc.id === plant.locationId
                        });
                        return (
                            <tr>
                                <td>
                                    <Link to={`plantPage/${plant.id}`} className='text-link'><AccountCircleIcon
                                        style={{color: "#138a04"}}/></Link>
                                </td>
                                <td>{plant.name}</td>
                                <td>  {location.length > 0 && location[0].name}
                                </td>
                                <td>{plant.quantity}</td>
                                <td><IconButton color="secondary" onClick={(e) => this.removePlant(plant.id, e)}>
                                    <DeleteIcon/>
                                </IconButton></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <ScanPlant/>
            </Form>
        )
    }
}

export default Plants;