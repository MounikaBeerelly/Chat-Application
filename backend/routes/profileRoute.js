const profilePageApi = require('../api/profiePageApi');
const profileValidator = require('../middlewares/requestValidators');

function applyRoute(app) {
    app.get('/profile', profileValidator.profileRequestValidator, profilePageApi.invoke);
    app.put('/profile', profileValidator.profileUpdateRequestValidator, profilePageApi.updateProfile);
    app.delete('/profile', profileValidator.profileDeleteRequestValidator, profilePageApi.deleteProfile);
}

module.exports = { applyRoute }