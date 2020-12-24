const messageService = require('./messageService');

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


        clientSocket.on('newUser', (data) => {
            Users.push({ id: clientSocket.id, userName: data.userName, name: data.firstName });
            io.emit('loadUsers', Users);
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

        clientSocket.on('messageHistory', (data) => {
            messageService.getMessages(data.fromUserName, data.toUserName).then((messageResponse) => {
                clientSocket.emit('shareMessage', { message: messageResponse, fromUserName: data.fromUserName, toUserName: data.toUserName });
            }).catch((err) => {
                console.log(err);
            })
        })

        clientSocket.on('disconnect', (socket) => {
            console.log('disconnected', clientSocket.id)
            for (let i = 0; i < Users.length; i++) {
                if (Users[i].id === clientSocket.id) {
                    Users.splice(i, 1);
                }
            }
            delete clientSocketsArr[clientSocket.id];
            io.emit('loadUsers', Users);
        });
    });

    // io.on('newUser', (data) => {
    //     console.log
    //     Users.push({ id: clientSocket.id, userName: data.userName, name: data.firstName });
    //     io.emit('loadUsers', Users)
    // });
}

function getUserSocket(userName) {
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].userName === userName) {
            return clientSocketsArr[Users[i].id];
        }
    }
}

function getUserSocketId(userName) {
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].userName === userName) {
            return Users[i].id;
        }
    }
}

function getUserName(socketId) {
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].id === socketId) {
            return Users[i].userName;
        }
    }
}


module.exports = { initiateSocket, getUserSocket }