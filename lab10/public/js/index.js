/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false */
'use strict';
let chat = io(`http://${location.host}/chat`);
const icons = [
    'fas fa-umbrella-beach',
    'fas fa-robot',
    'fas fa-hamburger',
    'fas fa-american-sign-language-interpreting',
    'fas fa-handshake',
    'fas fa-fist-raised',
];
document.addEventListener('DOMContentLoaded', () => {
    createIconsSelect();
    const body = document.body;
    body.addEventListener('click', () => {
        const iconList = document.getElementById('iconList');
        iconList.style.display = 'none'
    }, true);

    const userData = document.getElementById('userData');
    const topNav = document.getElementById('topNav');
    const main = document.getElementById('main');
    const loginWrapper = document.getElementById('loginWrapper');
    const roomListElement = document.getElementById('roomList');

    topNav.style.display = 'none';
    main.style.display = 'none';

    chat.on('rooms', rooms => {
        while (roomListElement.firstChild) {
            roomListElement.removeChild(roomListElement.firstChild);
        }
        rooms.forEach(room => {
            const roomElement = document.createElement('p');
            roomElement.innerHTML = `<i class="${room.icon}"></i>${room.name}`;
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
    const roomNameInput = document.getElementById('roomName');
    const iconBox = document.getElementById('iconBox');
    if (roomNameInput.value && iconBox.value) {
        chat.emit('add-room', {
            id: generateId(),
            name: roomNameInput.value,
            icon: icons[iconBox.value],
        });
        roomNameInput.value = "";
        iconBox.value = "";
        iconBox.innerHTML = "";
    } else {
        swal({
            title: 'Uzupełnij wszystkie pola',
            icon: 'error',
        });
    }
};

const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const openNav = () => {
    const sideNavStyle = document.getElementById('mySidenav').style;
    sideNavStyle.width = '300px';
    sideNavStyle.padding = '.5rem 1rem';
};

const closeNav = () => {
    const sideNavStyle = document.getElementById('mySidenav').style;
    sideNavStyle.width = '0';
    sideNavStyle.padding = '0';
};

const createIconsSelect = () => {
    const selectContainer = document.getElementById('selectIcon');
    selectContainer.className = 'square-div select-container';
    const iconBox = document.createElement('div');
    iconBox.id = 'iconBox';
    iconBox.className = 'square-div';
    iconBox.style.border = '1px solid black';
    iconBox.addEventListener('click', (ev) => {
        selectContainer.querySelector('ul').style.display = 'block';
    });
    selectContainer.appendChild(iconBox);
    const select = document.createElement('ul');
    select.style.display = 'none';
    select.id = 'iconList';
    icons.forEach((icon, key) => {
        const option = document.createElement('li');
        option.value = key;
        option.innerHTML = `<i class="${icon}" value="${key}"></i>`;
        option.addEventListener('click', (ev) => {
            const value = ev.target.getAttribute('value');
            iconBox.value = value;
            iconBox.innerHTML = `<i class="${icons[value]}"></i>`;
            select.style.display = 'none';
        });
        select.appendChild(option);
    });
    selectContainer.appendChild(select);
};
