function loginRequestValidator(req, res, next) {
    if (!!req.body && !!req.body.userName && !!req.body.password) {
        next();
    } else {
        res.status(400).json({ status: 400, message: 'invalid request' });
    }
}

function registrationRequestValidator(req, res, next) {
    if (!!req.body && !!req.body.firstName && !!req.body.lastName && !!req.body.userName && !!req.body.password) {
        next();
    } else {
        res.status(400).json({ status: 400, message: 'invalid request' });
    }
}

function profileRequestValidator(req, res, next) {
    if (!!req.params && !!req.query.userName) {
        next();
    } else {
        res.status(400).json({ status: 400, message: 'Invalid request' });
    }
}

function profileUpdateRequestValidator(req, res, next) {
    if (!!req.body && !!req.body.userName && (!!req.body.firstName || !!req.body.lastName)) {
        next();
    } else {
        res.status(400).json({ status: 400, message: 'Invalid request' });
    }
}

function profileDeleteRequestValidator(req, res, next) {
    if (!!req.body && !!req.body.userName) {
        next();
    } else {
        res.status(400).json({ status: 400, message: 'Invalid request' });
    }
}

module.exports = { loginRequestValidator, registrationRequestValidator, profileRequestValidator, profileUpdateRequestValidator, profileDeleteRequestValidator }