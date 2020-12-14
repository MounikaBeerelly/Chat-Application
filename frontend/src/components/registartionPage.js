// import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// class RegistrationComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             firstName: '',
//             lastName: '',
//             userName: '',
//             password: '',
//             isFlag: false
//         }
//         this.onChangeFirstName = this.onChangeFirstName.bind(this);
//         this.onChangeLastName = this.onChangeLastName.bind(this);
//         this.onChangeUserName = this.onChangeUserName.bind(this);
//         this.onChangePassword = this.onChangePassword.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }

//     onChangeFirstName(e) {
//         this.setState({
//             firstName: e.target.value
//         })
//     }

//     onChangeLastName(e) {
//         this.setState({
//             lastName: e.target.value
//         })
//     }

//     onChangeUserName(e) {
//         this.setState({
//             userName: e.target.value
//         })
//     }

//     onChangePassword(e) {
//         this.setState({
//             password: e.target.value
//         })
//     }

//     onSubmit(e) {
//         e.preventDefault();
//         const obj = {
//             firstName: this.state.firstName,
//             lastName: this.state.lastName,
//             userName: this.state.userName,
//             password: this.state.password
//         };

//         axios.post('http://localhost:5000/register', obj)
//             .then(res => {
//                 this.setState(alert(res.data.message));;

//             }).catch(err => {
//                 this.setState({ msg: err.res.data.message });
//             });

//         this.setState({
//             firstName: '',
//             lastName: '',
//             userName: '',
//             password: ''
//         });
//     }

//     render() {
//         const { firstName, lastName, userName, password } = this.state;
//         const msg = this.state.msg;
//         const enabled =
//             firstName.length > 0 &&
//             lastName.length > 0 &&
//             userName.length > 0 &&
//             password.length > 0;

//         return (
//             <div style={{ marginTop: 10 }}>
//                 <h2 style={{ "textAlign": "center", color: "blue", "fontStyle": 'italic' }}>Registration Form</h2>
//                 {this.state.isFlag && <div className="alert alert-success">{msg}</div>}
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>First Name: </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="FirstName"
//                             value={this.state.firstName}
//                             required
//                             onChange={this.onChangeFirstName}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Last Name: </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="LastName"
//                             value={this.state.lastName}
//                             required
//                             onChange={this.onChangeLastName}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>UserName: </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Username"
//                             value={this.state.userName}
//                             required
//                             onChange={this.onChangeUserName}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Password: </label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             placeholder="Password"
//                             value={this.state.password}
//                             required
//                             onChange={this.onChangePassword}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="submit"
//                             value="Register"
//                             className="btn btn-primary"
//                             disabled={!enabled}
//                         />
//                     </div>
//                 </form>
//                 <h5>already have an account? <Link to="/login">Login here</Link> </h5>
//             </div>
//         );
//     }
// }

// export default RegistrationComponent;

import React from 'react';
import axiosInstance from '../axiosService';
import { Link } from 'react-router-dom';

import '../App.css';

function RegistrationComponent() {
    return (
        <div className="container">
            <h2 style={{ "textAlign": "center", color: "blue", "fontStyle": 'italic' }}>Registratioon Form</h2>
            <form onSubmit={(e) => register(e)}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">User Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Register</button>
            </form>
            <br /> <br />
            <h5>Already have an account? <Link to="/login">Login</Link> </h5>
        </div>
    );
}

function register(e) {
    e.preventDefault();
    let request = {
        firstName: document.getElementById('firstname').value,
        lastName: document.getElementById('lastname').value,
        userName: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    axiosInstance().post('/register', request)
        .then(res => {
            alert(res.data.message);
        })
        .catch(err => {
            console.log(err);
        })
}

export default RegistrationComponent;