import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Col,
    FloatingLabel,
    FormLabel,
    FormSelect,
    Row,
    Table
} from "react-bootstrap";
import QRCodeGeneration from "../plants/QRCodeGeneration";
import ScanPlant from "../plants/ScanPlant";

//TODO create UserService https://www.youtube.com/watch?v=5RA5NpxbioI
class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            unAssignedPlants: [],
            userPlants: [],
            scanQRCode: '',
            scannedPlantId: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        //maybe show the props here and what it has
        axios.get(`/user/${this.props.match.params.id}`)
            .then(response => this.setState({
                user: response.data,
                userPlants: response.data.plants
            }))

        axios.get('/plant/unassigned')
            .then(response => this.setState({unAssignedPlants: response.data}))
    }

    handleChange(e) {
        const plantFound = this.state.unAssignedPlants.filter(plant => {
            return plant.id.toString() === e.target.value
        });
        axios.put(`/user/${this.props.match.params.id}`, plantFound[0])
            .then(response => this.setState({
                user: response.data,
                userPlants: [...this.state.user.plants, plantFound[0]],
                unAssignedPlants: this.state.unAssignedPlants.filter(el => el.id !== plantFound[0].id)
            }));
    }

    updatePlantQuantity(id, addedValue) {
        const plantFound = this.state.userPlants.filter(plant => {
            return plant.id === id
        });
        this.state.userPlants.find(item => item.id === id).quantity += addedValue;

        axios.put(`/plant/${plantFound[0].id}`, plantFound[0])
            .then(() => this.setState({userPlants: this.state.userPlants}));

        // if (plantFound[0].quantity === 0) {
        //     axios.delete(`/plant/${plantFound[0].id}`).then(() => this.setState({
        //             unAssignedPlants: this.state.unAssignedPlants.filter(el => el.id === plantFound[0].id)
        //         })
        //     );
        // }
    }

    handleScan = id => {
        if (id) {
            axios.get(`/plant/${id}`)
                .then(response => {
                    const ids = this.state.userPlants.id;
                    if (!this.state.userPlants.includes(response.data)) {
                        axios.put(`/user/${this.props.match.params.id}`, response.data)
                            .then(() => this.setState({
                                unAssignedPlants: this.state.unAssignedPlants.filter(el => el.id.toString() !== id),
                                userPlants: [...this.state.user.plants, response.data]
                            }));
                    }
                });
        }
    }

    startCamera() {
        const scanQR = this.state.scanQRCode;
        this.setState({scanQRCode: !scanQR});
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <FormLabel column="lg" lg={2}>
                            Username -
                        </FormLabel>
                    </Col>
                    <Col>
                        <FormLabel column="lg" lg={2}>
                            {this.state.user.username}
                        </FormLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormLabel column="lg" lg={2}>
                            Email -
                        </FormLabel>
                    </Col>
                    <Col>
                        <FormLabel column="lg" lg={2}>
                            {this.state.user.email}
                        </FormLabel>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <FormLabel column="lg" lg={3}>
                            Add a new plant -
                        </FormLabel>
                    </Col>
                    <Col>
                        <FormLabel column="lg" lg={8}>
                            <FloatingLabel controlId="floatingSelect" label="">
                                <FormSelect aria-label="Floating label select example"
                                            onChange={this.handleChange}>
                                    <option>Select from the unassigned plants</option>
                                    {this.state.unAssignedPlants.map((plant) =>
                                        <option key={plant.id} value={plant.id}>
                                            {plant.name}
                                        </option>
                                    )}
                                </FormSelect>
                            </FloatingLabel>
                        </FormLabel>
                    </Col>
                    <Row>
                        <Row>
                            <FormLabel column="lg" lg={12}>
                                List of all plants assigned to the user:
                            </FormLabel>
                        </Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Plant Name</th>
                                    <th>Plant location</th>
                                    <th>QR code</th>
                                    <th>Plants quantity</th>
                                    <th>Update quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.userPlants.map((plant) =>
                                    <tr>
                                        <td/>
                                        <td>
                                            {plant.name}
                                        </td>
                                        <td>
                                            {plant.location}
                                        </td>
                                        <td>
                                            <QRCodeGeneration id={plant.id}/>
                                        </td>
                                        <td>
                                            {plant.quantity}
                                        </td>
                                        <td>
                                            <Button variant="primary" type="submit" onClick={() =>
                                                this.updatePlantQuantity(plant.id, 1)}>
                                                Increase quantity
                                            </Button>
                                        </td>
                                        {plant.quantity > 1 &&
                                        <td>
                                            <Button variant="primary" type="submit" onClick={() =>
                                                this.updatePlantQuantity(plant.id, -1)}>
                                                Decrease quantity
                                            </Button>
                                        </td>
                                        }
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                            <Button variant="primary" onClick={() => this.startCamera()}>
                                Scan QR Code
                            </Button>
                            {this.state.scanQRCode && <ScanPlant handleScan={this.handleScan}/>}
                        </Col>
                    </Row>
                </Row>
            </>
        );
    }
}

export default UserPage;