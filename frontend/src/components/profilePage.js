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
            onlineUsers: [],
            messages: [],
        };
        this.selectedUser = null;
        this.selectedUserFlag = 0;
        this.socket = null;
    }

    componentDidMount() {
        axiosInstance().get('/profile?userName=' + sessionStorage.getItem('chatapp-userName'))
            .then(response => {
                if (response.data.status === 401) {
                    sessionStorage.removeItem('chatapp-userToken');
                    window.location = '/login';
                } else if (response.data.status === 200) {
                    this.socket = openSocket('http://localhost:5000', { transports: ['websocket'] });
                    this.setState({ users: response.data.profielInfo });
                    const userData = {
                        id: this.socket.id,
                        userName: this.state.users.userName,
                        firstName: this.state.users.firstName
                    }
                    this.socket.emit('fetchUsers', { loginUserName: this.state.users.userName });
                    this.socket.emit('onlineUser', userData);
                    this.socket.on('loadUsers', (userData) => {
                        console.log('users array', userData);
                        this.selectedUserFlag = 0;
                        this.setState({ onlineUsers: userData });
                    });
                    this.socket.on('refreshUsers', () => {
                        this.socket.emit('fetchUsers', { loginUserName: this.state.users.userName });
                    });

                    this.socket.on('shareMessage', (messageData) => {
                        console.log('new Message', messageData);
                        this.setState({ messages: messageData.message });
                    });
                }
            })
            .catch(function (error) {
                sessionStorage.removeItem('chatapp-userToken');
                window.location = '/login';
            })
    }

    changeUser = e => {
        this.selectedUser = e.target.id;
        this.selectedUserFlag = 0;
        this.setState({ onlineUsers: this.state.onlineUsers });
        this.getMessagesHistory(this.selectedUser);
    }

    sendMessage = event => {
        event.preventDefault();
        if (!!this.socket) {
            let messageText = this.state.messageText;
            this.socket.emit('message', {
                fromUserName: this.state.users.userName,
                toUserName: this.selectedUser,
                message: messageText
            });
            this.setState({ messageText: '' });
        }

    };

    getMessagesHistory = (fromUserName) => {
        this.socket.emit('messageHistory', {
            fromUserName: this.state.users.userName,
            toUserName: this.selectedUser
        })
    }

    handleChange = event => {
        this.setState({ messageText: event.target.value });
    };

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
                                                    if (!!this.selectedUser) {
                                                        this.selectedUserFlag = 1;
                                                    } else {
                                                        this.selectedUserFlag = 1;
                                                        this.selectedUser = user.userName;
                                                    }
                                                    this.getMessagesHistory(this.selectedUser);
                                                }
                                                return <li className={user.userName === this.selectedUser ? 'activeUser' : (user.status === 'active' ? 'onlineUser' : '')} key={index} id={user.userName} onClick={this.changeUser}>{user.firstName}</li>
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div id="chatPage" className="col-md-8">
                                    <div id="chatBox" className="col-md-12">
                                        {this.state.messages.map((messageData, index) => {
                                            if (messageData.fromUserName === this.selectedUser ||
                                                (messageData.fromUserName === this.state.users.userName && messageData.toUserName === this.selectedUser)) {

                                                return <p key={index} className={messageData.fromUserName === this.state.users.userName ? 'self' : 'others'}>{messageData.message}</p>
                                            } else {
                                                return null;
                                            }
                                        })}
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