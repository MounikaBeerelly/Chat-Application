const profilePageApi = require('../api/profiePageApi');
const profileValidator = require('../middlewares/requestValidators');
const { validateRequest } = require('../middlewares/authMiddleware');

function applyRoute(app) {
    app.get('/profile', profileValidator.profileRequestValidator, validateRequest, profilePageApi.invoke);
    app.put('/profile', profileValidator.profileUpdateRequestValidator, validateRequest, profilePageApi.updateProfile);
    app.delete('/profile', profileValidator.profileDeleteRequestValidator, validateRequest, profilePageApi.deleteProfile);
}

module.exports = { applyRoute }