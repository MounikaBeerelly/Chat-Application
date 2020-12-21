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
            console.log('users', Users)
            io.emit('loadUsers', Users);
        });

        clientSocket.on('message', (data) => {
            let receiverId = data.socketId;
            let message = data.message;
            clientSocket.broadcast.to(receiverId).emit('sharemessage', { message: message, senderId: clientSocket.id });
        });

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


module.exports = { initiateSocket, getUserSocket }