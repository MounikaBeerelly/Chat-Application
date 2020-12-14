
const cluster = require('cluster');
const OS = require('os');
const loggerService = require('./services/loggerService');
const { initiateWorker } = require('./worker');
// const cronJob = require('cron').CronJob;


// new cronJob({
//     cronTime: '*/5 * * * * *',
//     onTick: myCronHandler,
//     start: true,
//     context: null,
//     runOnInit: true
// })

if (cluster['isMaster']) {
    for (let i = 0; i < OS.cpus().length; i++) {
        cluster.fork();
    }
} else {
    initiateWorker();
}

// function myCronHandler() {
//     console.log('my logic')
// }