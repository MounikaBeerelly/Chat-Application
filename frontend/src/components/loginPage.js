import React, { Component } from 'react';
import axiosInstance from '../axiosService';
import { Link, Redirect } from 'react-router-dom';

import '../App.css';

class LoginComponent extends Component {
    render() {
        if (sessionStorage.getItem('chatapp-userToken')) {
            return (
                <Redirect to='/profile' />
            )
        } else {
            return (
                <div className="container">
                    <h2 style={{ "textAlign": "center", color: "blue", "fontStyle": 'italic' }}>Login Form</h2>
                    <form onSubmit={(e) => login(e)}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">Login</button>
                    </form>
                    <br /> <br />
                    <h5>Don't have an account? <Link to="/register">Register</Link> </h5>
                </div>
            );
        }
    }
}

function login(e) {
    e.preventDefault();
    let request = {
        userName: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    axiosInstance().post('/login', request)
        .then(res => {
            if (res.data.status === 200) {
                if (res.data.token) {
                    sessionStorage.setItem('chatapp-userToken', res.data.token);
                }
                if (request.userName) {
                    sessionStorage.setItem('chatapp-userName', request.userName)
                }
                setTimeout(() => {
                    window.location = '/profile';
                }, 3000);
            }
            alert(res.data.message);
        })
        .catch(err => {
            console.log(err);
        })
}

export default LoginComponent;