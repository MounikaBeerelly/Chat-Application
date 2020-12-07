const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


var mongoUtil = require('./services/dbService/dbConnection');
const registrationApi = require('./api/registrationApi');

mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);


    const loginRoute = require('./routes/loginRoute');
    const registrationRoute = require('./routes/registrationRoute');
    const profileRoute = require('./routes/profileRoute');


    // let Users = [];
    // io.on('connection', function (clientSocket) {
    //     console.log(clientSocket.id, '-- got connected');
    //     clientSocket.on('newUser', (data) => {
    //         Users.push({ id: clientSocket.id, name: data });
    //         io.emit('loadUsers', Users);
    //     });

    //     clientSocket.on('message', (data) => {
    //         let receiverId = data.socketId;
    //         let message = data.message;
    //         clientSocket.broadcast.to(receiverId).emit('sharemessage', { message: message, senderId: clientSocket.id });
    //     });

    //     clientSocket.on('disconnect', (socket) => {
    //         for (let i = 0; i < Users.length; i++) {
    //             if (Users[i].id === clientSocket.id) {
    //                 Users.splice(i, 1);
    //             }
    //         }
    //         io.emit('loadUsers', Users);
    //     });
    // });

    // io.on('newUser', (data) => {
    //     console.log
    //     Users.push(data);
    //     io.emit('loadUsers', Users)
    // });


    const port = 5000;

    app.use(bodyParser.json());

    app.use(express.static("public"));


    //Allow Cross-Origin resourse sharing
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.header('Access-Control-Expose-Headers', 'Content-Length');
        res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        } else {
            return next();
        }
    });

    loginRoute.applyRoute(app);
    registrationRoute.applyRoute(app);
    profileRoute.applyRoute(app);

    server.listen(port, () => {
        console.log('Server running on the port 5000');
    });
});