const jwtService = require('../services/jwtService');

function validateRequest(req, res, next) {
    if (!!req.headers && !!req.headers.authorization) {
        const token = req.headers.authorization;
        jwtService.verify(token).then((decodedData) => {
            next();
        }).catch((err) => {
            res.status(401).json({ status: 401, message: 'Unauthorized request' });
        })
    } else {
        res.status(400).json({ status: 400, message: 'Bad request' });
    }
}

module.exports = { validateRequest }