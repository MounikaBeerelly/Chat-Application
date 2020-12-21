import React, { Component } from 'react';
import './chatPage.css';

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {
                firstName: '',
                lastName: '',
                userName: '',
            },
            messageText: '',
        };
    }

    render() {
        return (
            <div>
                <p>Chat Page</p>
                <div className="wrapper">
                    <div className="leftWrapper">
                        <h5 style={{ "fontSize": "20px" }}>Login Details</h5>
                        <h6>UserName: <i>{this.state.users.userName}</i></h6>
                        <h6>FirstName: <i>{this.state.users.firstName}</i></h6>
                        <h6>LastName: <i>{this.state.users.lastName}</i></h6>
                    </div>
                    <div className="rightWrapper">
                        <h4 style={{ "textAlign": "center", "fontSize": "20px" }}>Chat Page</h4>
                        <div className="chatWindow">
                            <div className="sidebar">
                                <h4><u>List of users :</u></h4>
                                <ul id="userAccordion" className="sidebar-nav">
                                </ul>
                            </div>
                            <div className="main">
                                <div className="chatPage">
                                    <div id="inputSection" className="row">
                                        <div className="col-md-10">
                                            <input
                                                type="text"
                                                id="messageBox"
                                                placeholder="Enter your message here"
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="col-md-2" >
                                            <button
                                                id="sendBtn"
                                                className="btn btn-success"
                                                onClick={this.handleClick}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default ChatPage;