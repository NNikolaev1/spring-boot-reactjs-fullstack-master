import React, {Component} from 'react';
import PropTypes from "prop-types";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";

class UserInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {id} = this.props.user;
        return (
            <tr>
                <td>
                    <Link to={`userPage/${id}`} className='text-link'><AccountCircleIcon
                        style={{color: "#138a04"}}/></Link>
                </td>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.email}</td>
                <td><IconButton color="secondary" onClick={(e) => this.props.removeUser(id, e)}>
                    <DeleteIcon/>
                </IconButton></td>
            </tr>
        );
    }
}

UserInfo.propTypes =
    {
        user: PropTypes.object.isRequired
    }
export default UserInfo;