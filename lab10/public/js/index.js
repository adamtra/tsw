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


    window.onbeforeunload = (event) => {
        event.preventDefault();
        alert('HAHA');
        chat.emit('disconnect');
    };

};

const addRoom = () => {
    const roomNameInput = document.getElementById('room_name');
    if (roomNameInput.value) {
        chat.emit('add-room', {
            id: generateId(),
            name: roomNameInput.value,
        });
        roomNameInput.value = "";
    }
};

const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const openNav = () => {
    const sideNavStyle = document.getElementById('mySidenav').style;
    sideNavStyle.width = '250px';
    sideNavStyle.padding = '.5rem 1rem';
};

const closeNav = () => {
    const sideNavStyle = document.getElementById('mySidenav').style;
    sideNavStyle.width = '0';
    sideNavStyle.padding = '0';
};
