const registrationApi = require('../api/registrationApi');
const requestValidators = require('../middlewares/requestValidators');

function applyRoute(app) {
    app.post('/register', requestValidators.registrationRequestValidator, registrationApi.invoke);
}

module.exports = { applyRoute }