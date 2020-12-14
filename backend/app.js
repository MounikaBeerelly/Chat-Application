
const cluster = require('cluster');
const OS = require('os');
const loggerService = require('./services/loggerService');
const { initiateWorker, getSomeAsyncData } = require('./worker');
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
            console.log(worker.process.pid)
            workers[worker.process.pid] = worker;
            configData.processId = worker.process.pid;

        }
        cluster.on('online', function (onlineWorker) {
            onlineWorker.send(configData);
        })
    })
} else {
    initiateWorker();
}

// function myCronHandler() {
//     console.log('my logic')
// }
