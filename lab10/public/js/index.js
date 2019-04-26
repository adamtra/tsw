/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false */
'use strict';
let chat = io(`http://${location.host}/chat`);
document.addEventListener('DOMContentLoaded', () => {
    const userData = document.getElementById('userData');
    const topNav = document.getElementById('topNav');
    const main = document.getElementById('main');
    const loginWrapper = document.getElementById('loginWrapper');
    const roomListElement = document.getElementById('room_list');

    topNav.style.display = 'none';
    main.style.display = 'none';

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

    chat.on('error-message', err => {
       swal({
          title: err,
           icon: 'error',
       });
    });

    chat.on('logged', username => {
        topNav.style.display = '';
        main.style.display = '';
        loginWrapper.className = '';
        loginWrapper.style.display = 'none';
        const welcome = document.createElement('span');
        welcome.style.color = 'white';
        welcome.textContent = `Witaj ${username}!`;
        const logOutButton = document.createElement('button');
        logOutButton.className = 'btn btn-danger';
        logOutButton.style.marginLeft = '10px';
        const logOutIcon = document.createElement('i');
        logOutIcon.className = 'fas fa-sign-out-alt';
        logOutButton.appendChild(logOutIcon);
        logOutButton.addEventListener('click', () => {
            window.location.reload();
        });
        userData.appendChild(welcome);
        userData.appendChild(logOutButton);
    });

    window.addEventListener('beforeunload', () => {
        chat.emit('close-connection');
    });
});

const login = () => {
    const usernameInput = document.getElementById('username');
    if (usernameInput.value) {
        chat.emit('login', usernameInput.value);
        usernameInput.value = "";
    }
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
