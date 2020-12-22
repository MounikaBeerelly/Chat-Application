import React, { Component } from 'react';
import axiosInstance from '../axiosService';
import openSocket from 'socket.io-client';

class ProfilePageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {
                firstName: '',
                lastName: '',
                userName: '',
            },
            messageText: '',
            onlineUsers: []
        };
        this.selectedUser = null;
        this.selectedUserFlag = 0;

    }

    sendMessage = event => {
        event.preventDefault();
        console.log(this.state.messageText)
    };

    handleChange = event => {
        this.setState({ messageText: event.target.value });
    };

    componentDidMount() {
        axiosInstance().get('/profile?userName=' + sessionStorage.getItem('chatapp-userName'))
            .then(response => {
                if (response.data.status === 401) {
                    sessionStorage.removeItem('chatapp-userToken');
                    window.location = '/login';
                } else if (response.data.status === 200) {
                    const socket = openSocket('http://localhost:5000', { transports: ['websocket'] });
                    this.setState({ users: response.data.profielInfo });
                    const userData = {
                        id: socket.id,
                        userName: this.state.users.userName,
                        firstName: this.state.users.firstName
                    }
                    socket.emit('newUser', userData);

                    socket.on('loadUsers', (userData) => {
                        console.log('new User joined', userData);
                        this.selectedUserFlag = 0;
                        this.setState({ onlineUsers: userData });
                    })
                }
            })
            .catch(function (error) {
                sessionStorage.removeItem('chatapp-userToken');
                window.location = '/login';
            })
    }

    changeUser = e => {
        this.selectedUser = e.target.id;
        console.log(this.selectedUser);
    }

    render() {
        const { onlineUsers } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5 style={{ "fontSize": "20px" }}>Login Details</h5>
                        <h6>UserName: <i>{this.state.users.userName}</i></h6>
                        <h6>FirstName: <i>{this.state.users.firstName}</i></h6>
                        <h6>LastName: <i>{this.state.users.lastName}</i></h6>
                    </div>
                    <div className="col-md-9">
                        {this.state.onlineUsers.length > 1 && (
                            <div className="chatWindow">
                                <div className="col-md-4" id="sidebar-wrapper">
                                    <h4><u>List of users :</u></h4>
                                    <ul id="userAccordion" className="sidebar-nav">
                                        {onlineUsers.map((user, index) => {
                                            if (user.userName !== this.state.users.userName) {
                                                if (this.selectedUserFlag === 0) {
                                                    this.selectedUserFlag = 1;
                                                    this.selectedUser = user.userName;

                                                }
                                                return <li className={user.userName === this.selectedUser ? 'activeUser' : ''} key={index} id={user.userName} onClick={this.changeUser}>{user.name}</li>
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div id="chatPage" className="col-md-8">
                                    <div id="chatBox" className="col-md-12">

                                    </div>
                                    <div id="inputSection" className="row">
                                        <div className="col-md-10">
                                            <input
                                                type="text"
                                                id="messageBox"
                                                onChange={this.handleChange}
                                                value={this.state.messageText}
                                                placeholder="Enter your message here"
                                            />
                                        </div>
                                        <div className="col-md-2" >
                                            <button
                                                id="sendBtn"
                                                className="btn btn-success"
                                                onClick={this.sendMessage}>Send</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePageComponent;