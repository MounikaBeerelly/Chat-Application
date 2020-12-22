function initiateWorker(server, app) {
    process.on('uncaughtException', function (err) {
        console.log('uncaught exception: ', err)
    })


    const mongoUtil = require('./services/dbService/dbConnection');
    const socketService = require('./services/socketService');
    const registrationApi = require('./api/registrationApi');
    mongoUtil.connectToServer(function (err, client) {


        if (err) console.log(err);
        const loginRoute = require('./routes/loginRoute');
        const registrationRoute = require('./routes/registrationRoute');
        const profileRoute = require('./routes/profileRoute');
        const uploadRoute = require('./routes/uploadRoute');

        const port = 5000;

        //Allow Cross-Origin resourse sharing
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
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

        app.get('/healthCheck', function (req, res) {
            res.send("Server is Up and running.")
        })

        loginRoute.applyRoute(app);
        registrationRoute.applyRoute(app);
        profileRoute.applyRoute(app);
        uploadRoute.applyRoute(app);
        socketService.initiateSocket(server);
        server.listen(port, () => {
            console.log('Server running on the port 5000');
        });
    });
}
module.exports = { initiateWorker, getSomeAsyncData }



function getSomeAsyncData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ JWT_ALGO: 'RS256' });
        }, 5000)
    })
}
process.on('message', function (data) {
    global.JWT_ALGO = data.JWT_ALGO;
})



process.on('uncaughtException', function (exception) {
    console.log(exception)
})