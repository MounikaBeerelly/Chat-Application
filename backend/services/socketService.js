const messageService = require('./messageService');
const usersService = require('./usersService');

let Users = [];
let clientSocketsArr = [];

function initiateSocket(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', function (clientSocket) {
        clientSocketsArr[clientSocket.id] = clientSocket;
        console.log(clientSocket.id, '-- got connected')


        clientSocket.on('onlineUser', (data) => {
            usersService.updateUserStatus({ userName: data.userName }, { status: "active", socketId: clientSocket.id }).then((updateResponse) => {
                io.emit('refreshUsers', {});
            }).catch((err) => {
                console.log(err);
            })
        });

        clientSocket.on('message', (data) => {
            console.log('message', data)
            let toUserName = data.toUserName;
            let message = data.message;
            let toUserSocketID = getUserSocketId(toUserName);
            messageService.insertMessages(data).then((insertResponse) => {
                messageService.getMessages(data.fromUserName, data.toUserName).then((messageResponse) => {
                    clientSocket.broadcast.to(toUserSocketID).emit('shareMessage', { message: messageResponse, fromUserName: data.fromUserName, toUserName: data.toUserName });
                    clientSocket.emit('shareMessage', { message: messageResponse, fromUserName: data.fromUserName, toUserName: data.toUserName });
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        });

        clientSocket.on('fetchUsers', (data) => {
            usersService.getUsers(data.loginUserName).then((usersResponse) => {
                console.log(usersResponse);
                clientSocket.emit('loadUsers', usersResponse);
            }).catch((err) => {
                console.log(err);
            })
        });

        clientSocket.on('messageHistory', (data) => {
            messageService.getMessages(data.fromUserName, data.toUserName).then((messageResponse) => {
                clientSocket.emit('shareMessage', { message: messageResponse, fromUserName: data.fromUserName, toUserName: data.toUserName });
            }).catch((err) => {
                console.log(err);
            })
        })

        clientSocket.on('disconnect', (socket) => {
            console.log('disconnected', clientSocket.id)
            usersService.updateUserStatus({ socketId: clientSocket.id }, { status: "inActive", socketId: '' }).then(() => {
                console.log('Updated record on disconnection');
                io.emit('refreshUsers', {});
            }).catch((err) => {
                console.log(err);
            })
            delete clientSocketsArr[clientSocket.id];
        });
    });
}

function getUserSocketId(userName) {
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].userName === userName) {
            return Users[i].id;
        }
    }
}


module.exports = { initiateSocket }