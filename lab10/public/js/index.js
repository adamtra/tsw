/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false */
'use strict';
let chat = io(`http://${location.host}/chat`);
document.onreadystatechange = () => {
    const roomListElement = document.getElementById('room_list');
    chat.on('rooms', rooms => {
        while (roomListElement.firstChild) {
            roomListElement.removeChild(roomListElement.firstChild);
        }
        rooms.forEach(room => {
           const roomElement = document.createElement('li');
           roomElement.textContent = room.name;
           roomElement.value = room.id;
           roomElement.addEventListener('click', () => {
              chat.emit('get-room', room.id);
           });
           roomListElement.appendChild(roomElement);
        });
    });

    chat.on('room', room => {
        console.log(room);
    });
};

const addRoom = () => {
    const roomNameInput = document.getElementById('room_name');
    chat.emit('add-room', {
        id: generateId(),
        name: roomNameInput.value,
    });
    roomNameInput.value = "";
};

const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};
