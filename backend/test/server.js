const bodyParser = require('body-parser');

function setupTestServer(app) {
    app.use(bodyParser.json());
    const testServer = app.listen(3000, function () {
        console.log('Test server is up and running');
    });
    return testServer;
}

module.exports = { setupTestServer }