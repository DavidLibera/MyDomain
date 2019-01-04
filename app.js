const http = require('http');

const routes = require('./routes')

const myServer = http.createServer(routes);

myServer.listen(3000);