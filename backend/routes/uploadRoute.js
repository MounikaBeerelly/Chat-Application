const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

function applyRoute(app) {
    app.post('/upload', upload.array('chatApp', 10), (req, res, next) => {
        const files = req.files;
        if (!!files) {
            console.log('files uploaded sucessfully')
            res.status(200).send(files);
        } else {
            res.status(400).send({ message: 'upload failed' });
        }
    })
}

module.exports = { applyRoute }