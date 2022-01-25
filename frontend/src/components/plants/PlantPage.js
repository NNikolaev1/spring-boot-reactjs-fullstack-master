import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Col, FloatingLabel,
    FormLabel, FormSelect,
    Row,
} from "react-bootstrap";
import ScanPlant from "../plants/ScanPlant";

//TODO create UserService https://www.youtube.com/watch?v=5RA5NpxbioI
class PlantPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: [],
            scanQRCode: '',
            locations: [],
            location: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        axios.get('/location/all')
            .then(response => this.setState({locations: response.data}))
        axios.get(`/plant/${this.props.match.params.id}`)
            .then(response => {
                if (response.data.locationId != null) {
                    axios.get(`/location/${response.data.locationId}`)
                        .then(responseLocation => this.setState({
                            location: responseLocation.data,
                            plant: response.data,
                        }))
                } else {
                    this.setState({
                        plant: response.data,
                    })
                }
            })
    }

    handleChange(e) {
        const locationFound = this.state.locations.filter(location => {
            return location.id.toString() === e.target.value
        });
        axios.put(`/plant/${this.props.match.params.id}`, locationFound[0])
            .then(() => this.setState({location: locationFound[0]}));
    }

    startCamera() {
        const scanQR = this.state.scanQRCode;
        this.setState({scanQRCode: !scanQR});
    }

    handleScan = id => {
        if (id) {
            axios.get(`/location/${id}`)
                .then(response => {
                    axios.put(`/plant/${this.props.match.params.id}`, response.data)
                        .then(() => this.setState({location: response.data}));
                });
        }
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <FormLabel column="lg" lg={2}>
                            Plant name -
                        </FormLabel>
                    </Col>
                    <Col>
                        <FormLabel column="lg" lg={2}>
                            {this.state.plant.name}
                        </FormLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormLabel column="lg" lg={2}>
                            Current Location name -
                        </FormLabel>
                    </Col>
                    <Col>
                        <FormLabel column="lg" lg={2}>
                            {this.state.location.name}
                        </FormLabel>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <FormLabel column="lg" lg={3}>
                            Assign to a new location -
                        </FormLabel>
                    </Col>
                    <Col>
                        <FormLabel column="lg" lg={8}>
                            <FloatingLabel controlId="floatingSelect" label="">
                                <FormSelect aria-label="Floating label select example"
                                            onChange={this.handleChange}>
                                    <option>Select from the list of locations</option>
                                    {this.state.locations.map((location) =>
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    )}
                                </FormSelect>
                            </FloatingLabel>
                        </FormLabel>
                    </Col>
                    <Button variant="primary" onClick={() => this.startCamera()}>
                        Scan QR Code
                    </Button>
                    {this.state.scanQRCode && <ScanPlant handleScan={this.handleScan}/>}
                </Row>
            </>
        );
    }
}

export default PlantPage;