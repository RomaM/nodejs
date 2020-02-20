const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes);
console.log(routes);

server.listen(7777);