function getAppEnv() {
    return process.env['APP_ENV']
}

function getEnvConfigFile() {
    const envConfig = require('./config/' + getAppEnv() + '.config.json');
    return envConfig;
}

module.exports = { getAppEnv, getEnvConfigFile };