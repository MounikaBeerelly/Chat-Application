const registrationService = require('../services/registrationService');

function invoke(req, res) {
    registrationService.invoke(req).then((registrationResponse) => {
        res.status(200).json(registrationResponse);
    }).catch((err) => {
        res.status(400).json(err);
    })
}

module.exports = { invoke }