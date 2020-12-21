const registrationService = require('../services/registrationService');
const logger = require('../services/loggerService');
function invoke(req, res) {
    registrationService.invoke(req).then((registrationResponse) => {
        logger.debug(req.body.transID, ' :- Registration was sucessfull');
        res.status(200).json(registrationResponse);
    }).catch((err) => {
        logger.error(req.body.transID + ' :- Got  invalid Registration response from servcie');
        res.status(400).json(err);
    })
}

module.exports = { invoke }