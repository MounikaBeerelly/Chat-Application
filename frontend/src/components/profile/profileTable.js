import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

class TableRow extends Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.firstName}
                </td>
                <td>
                    {this.props.obj.lastName}
                </td>
                <td>
                    {this.props.obj.userName}
                </td>
                {/* <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td> */}
            </tr>
        );
    }
}

export default TableRow;