const loginService = require('../services/loginService');
const logger = require('../services/loggerService');

function invoke(req, res) {
    logger.debug(req.body.transID + ' :- Login request received for username: ' + req.body.userName);
    loginService.invoke(req).then((loginResponse) => {
        if (loginResponse && loginResponse.status === 200) {
            logger.debug(req.body.transID, ' :- Login was sucessfull');
            res.status(200).json(loginResponse);
        } else {
            logger.error(req.body.transID + ' :- Got  invalid login response from servcie');
            res.status(400).json(loginResponse);
        }

    }).catch((err) => {
        logger.error(req.body.transID + ' :- Got exception from servcie' + JSON.stringify(err.stack));
        res.status(500).json({ status: 500, message: "Internal server error" });
    })

}

module.exports = { invoke };