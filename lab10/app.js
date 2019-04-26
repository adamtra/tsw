//jshint node: true, esversion: 6
'use strict';

const connect = require('connect');
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio.listen(httpServer);

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({
    rooms: [],
    users: [],
    messages: [],
}).write();

app.use(serveStatic('public'));

const chat = io.of('chat');
chat.on('connection', socket => {
    let previousId;
    const changeRoom = currentId => {
        socket.leave(previousId);
        socket.join(currentId);
        previousId = currentId;
    };

    socket.on('login', username => {
        username = username.trim();
        const user  = db.get('users').find({
            username: username,
        }).value();
        if (user) {
            socket.emit('error-message', 'Nazwa jest zajęta');
        } else {
            db.get('users').push({
                id: socket.id,
                username: username,
            }).write();
            socket.emit('logged', username);
            socket.emit('rooms', db.get('rooms').value());
        }
    });

    socket.on('send-message', message => {
        const room = db.get('rooms').find({
            id: previousId,
        }).value();
        if (room) {
            db.get('messages').push({
                text: message,
                room_id: room.id,
                created_at: getNow(),
            });
        }
    });

    socket.on('get-room', roomId => {
        const room = getRoom(roomId);
        if (room) {
            changeRoom(room.id);
            socket.emit('room', room);
        }
    });

    socket.on('add-room', room => {
        room.name = room.name.trim();
        const roomCheck = db.get('rooms').find({
            name: room.name,
        }).value();
        if (roomCheck) {
            socket.emit('error-message', 'Taki pokój już instnieje');
        } else {
            db.get('rooms').push({
                id: room.id,
                name: room.name,
                icon: room.icon,
            }).write();
            const rooms = db.get('rooms').value();
            chat.emit('rooms', rooms);
            const roomData = getRoom(room.id);
            changeRoom(room.id);
            socket.emit('room', roomData);
        }
    });

    socket.on('close-connection', () => {
       socket.leaveAll();
       db.get('users').remove({
           id: socket.id,
       }).write();
    });
});


const getRoom = (id) => {
    const room = db.get('rooms').find({
        id: id,
    }).value();
    if (room) {
        let response = {};
        Object.assign(response, room);
        response.message = db.get('messages')
            .filter({
                room_id: room.id,
            })
            .sortBy('created_at', 'desc')
            .take(5)
            .value();
        return response;
    }
    return null;
};

const getNow = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let hour = today.getUTCHours();
    let minutes = today.getMinutes();

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return `${yyyy}-${mm}-${dd} ${hour}:${minutes}`;
};

httpServer.listen(3000, () => {
    console.log('Serwer HTTP działa na pocie 3000');
});
