
const cluster = require('cluster');
const OS = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


const loggerService = require('./services/loggerService');
const { initiateWorker, getSomeAsyncData } = require('./worker');
const server = require('http').createServer(app);
// const cronJob = require('cron').CronJob;


// new cronJob({
//     cronTime: '*/5 * * * * *',
//     onTick: myCronHandler,
//     start: true,
//     context: null,
//     runOnInit: true
// })

if (cluster['isMaster']) {
    let workers = [];
    getSomeAsyncData().then((configData) => {
        for (let i = 0; i < OS.cpus().length; i++) {
            let worker = cluster.fork();
            workers[worker.process.pid] = worker;
            configData.processId = worker.process.pid;

        }
        cluster.on('online', function (onlineWorker) {
            onlineWorker.send(configData);
        })
    })
} else {
    initiateWorker(server, app);
}

// function myCronHandler() {
//     console.log('my logic')
// }
