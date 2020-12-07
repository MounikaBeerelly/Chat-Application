const loginApi = require('../api/loginApi');
const requestValidators = require('../middlewares/requestValidators');

function applyRoute(app) {
    app.post('/login', requestValidators.loginRequestValidator, loginApi.invoke);
}

module.exports = { applyRoute };