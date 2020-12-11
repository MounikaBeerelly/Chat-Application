import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../App.css';

function LoginComponent() {
    return (
        <div className="container">
            <h2 style={{ "text-align": "center", color: "blue", "font-style": 'italic' }}>Login Form</h2>
            <form onSubmit={(e) => login(e)}>
                <div className="form-group">
                    <label for="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
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

function login(e) {
    e.preventDefault();
    let request = {
        userName: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    axios.post('http://localhost:5000/login', request)
        .then(res => {
            alert(res.data.message);
        })
        .catch(err => {
            console.log(err);
        })
}

export default LoginComponent;