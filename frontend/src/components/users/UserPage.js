import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Route, useRouteMatch} from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
    }

    componentDidMount() {
        axios.get('/user/' + this.props.match.params.id)
            .then(response => this.setState({user: response.data}))
    }

    render() {
        return (
            <div>
                <p>{this.state.user.username}</p>
                <Link to="/userPage" className='text-link'><AccountCircleIcon style={{color: "#138a04"}}/></Link></div>
        );
    }
}

// UserPage.propTypes = {
//     user: PropTypes.object.isRequired
// }
export default UserPage;