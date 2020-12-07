const loginService = require('../services/loginService');

function invoke(req, res) {
    loginService.invoke(req).then((loginResponse) => {
        if (loginResponse && loginResponse.status === 200) {
            res.status(200).json(loginResponse);
        } else {
            res.status(400).json(loginResponse);
        }

    }).catch((err) => {
        res.status(500).json({ status: 500, message: "Internal server error" });
    })

}

module.exports = { invoke };