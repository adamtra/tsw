const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio.listen(httpServer);

module.exports = {
    httpServer: httpServer,
    io: io,
    app: app,
};
