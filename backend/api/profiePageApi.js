const profileRoute = require('../routes/profileRoute');
const profilePageService = require('../services/profilePageService');

function invoke(req, res) {
    profilePageService.invoke(req).then((profileResponse) => {
        res.status(200).json(profileResponse)
    }).catch((err) => {
        res.status(400).json(err)
    })
}

function updateProfile(req, res) {
    profilePageService.updateProfile(req).then((profileResponse) => {
        res.status(200).json(profileResponse)
    }).catch((err) => {
        res.status(400).json(err)
    })
}

function deleteProfile(req, res) {
    profilePageService.deleteProfile(req).then((profileResponse) => {
        res.status(200).json(profileResponse)
    }).catch((err) => {
        res.status(400).json(err)
    })
}

module.exports = { invoke, updateProfile, deleteProfile }