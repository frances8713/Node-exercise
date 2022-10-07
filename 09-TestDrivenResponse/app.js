const { createServer } = require("node:http");

function createApp() {
    return createServer((request, response) => {
        response.setStatus = 200;
        response.setHeader("Content-Type", "text/html");
        response.end(
            "<html><body><h2>Welcome to the World Wide Web!</h2></body></html>"
        );
    });
}

module.exports = createApp;
