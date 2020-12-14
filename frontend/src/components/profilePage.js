import React, { Component } from 'react';
import axiosInstance from '../axiosService';

class ProfilePageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {
                firstName: '',
                lastName: '',
                userName: ''
            }
        };
    }

    componentDidMount() {
        axiosInstance().get('/profile?userName=' + sessionStorage.getItem('chatapp-userName'))
            .then(response => {
                if (response.data.status === 401) {
                    sessionStorage.removeItem('chatapp-userToken');
                    window.location = '/login';
                } else if (response.data.status === 200) {
                    this.setState({ users: response.data.profielInfo });
                }
            })
            .catch(function (error) {
                sessionStorage.removeItem('chatapp-userToken');
                window.location = '/login';
            })
    }

    render() {
        return (
            <div>
                <h1>UserName: <i>{this.state.users.userName}</i></h1>
                <h1>FirstName: <i>{this.state.users.firstName}</i></h1>
                <h1>LastName: <i>{this.state.users.lastName}</i></h1>
            </div>
        );
    }
}

export default ProfilePageComponent;