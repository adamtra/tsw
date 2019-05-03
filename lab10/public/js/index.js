/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false */
'use strict';
let chat = io(`http://${location.host}/chat`);
const icons = [
    'umbrella-beach',
    'robot',
    'hamburger',
    'american-sign-language-interpreting',
    'handshake',
    'fist-raised',
    'baby',
    'award',
    'bell',
    'bicycle',
    'car',
    'cannabis',
    'cat',
];
let currentUser;

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
    const roomTitleElement = document.getElementById('roomTitle');
    const messageContainer = document.getElementById('messageContainer');
    const messagesContainer = document.getElementById('messages');

    messageContainer.style.display = 'none';
    topNav.style.display = 'none';
    main.style.display = 'none';

    chat.on('rooms', rooms => {
        roomListElement.textContent = '';
        rooms.forEach(room => {
            const roomElement = document.createElement('p');
            roomElement.className = 'wrap-text';
            const roomIcon = document.createElement('i');
            roomIcon.className = `fas fa-${room.icon}`;
            roomElement.appendChild(roomIcon);
            const roomName = document.createElement('span');
            roomName.textContent = room.name;
            roomElement.appendChild(roomName);
            roomElement.value = room.id;
            roomElement.addEventListener('click', () => {
                chat.emit('get-room', room.id);
                closeNav();
            });
            roomListElement.appendChild(roomElement);
        });
    });

    chat.on('room', room => {
        roomTitleElement.textContent = '';
        const title = document.createElement('span');
        title.textContent = 'Jesteś w pokoju: ';
        const icon = document.createElement('i');
        icon.className = `mx-2 fas fa-${room.icon}`;
        const name = document.createElement('span');
        name.textContent = room.name;
        name.className = 'mx-2';
        roomTitleElement.appendChild(title);
        roomTitleElement.appendChild(icon);
        roomTitleElement.appendChild(name);
        messageContainer.style.display = '';
        messagesContainer.textContent = '';
        room.messages.forEach(message => {
            showMessage(message);
        });
    });

    chat.on('new-message', message => {
        showMessage(message);
    });

    chat.on('error-message', err => {
        swal({
            title: err,
            icon: 'error',
        });
    });


    chat.on('logged', username => {
        currentUser = username;
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
            logout().then(() => {
                window.location.reload();
            });
        });
        userData.appendChild(welcome);
        userData.appendChild(logOutButton);
    });

    window.addEventListener('beforeunload', () => {
        logout();
    });
});

const login = () => {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    if (username) {
        chat.emit('login', username);
        usernameInput.value = '';
    }
};

const addRoom = () => {
    const roomNameInput = document.getElementById('roomName');
    const iconBox = document.getElementById('iconBox');
    const roomName = roomNameInput.value.trim();
    if (roomName && iconBox.value) {
        chat.emit('add-room', {
            id: generateId(),
            name: roomName,
            icon: icons[iconBox.value],
        });
        roomNameInput.value = '';
        iconBox.value = '';
        iconBox.innerHTML = '';
        closeNav();
    } else {
        swal({
            title: 'Uzupełnij wszystkie pola',
            icon: 'error',
        });
    }
};

const checkKey = () => {
  if (event.key === 'Enter') {
    if (event.ctrlKey) {
        const textBoxInput = document.getElementById('textBox');
        textBoxInput.value += '\n';
    } else if(!event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
  }
};

const sendMessage = () => {
    const textBoxInput = document.getElementById('textBox');
    const message = textBoxInput.value.trim();
    if (message) {
        chat.emit('send-message', message);
        textBoxInput.value = '';
    }
};

const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const openNav = () => {
    const sideNavStyle = document.getElementById('mySidenav').style;
    sideNavStyle.left = '0';
    sideNavStyle.padding = '.5rem 1rem';
};

const closeNav = () => {
    const sideNavStyle = document.getElementById('mySidenav').style;
    sideNavStyle.left = '-300px';
    sideNavStyle.padding = '0';
};

const showMessage = (message) => {
    const messagesContainer = document.getElementById('messages');
    while (messagesContainer.childElementCount >= 5) {
        messagesContainer.removeChild(messagesContainer.firstChild);
    }
    const messageLine = document.createElement('div');
    messageLine.className = 'd-flex my-2 p-2';
    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble p-3';
    if (message.user === currentUser) {
        messageLine.classList.add('justify-content-end');
        chatBubble.classList.add('right-bubble');
    } else {
        messageLine.classList.add('justify-content-start');
        chatBubble.classList.add('left-bubble');
    }
    const messageInfo = document.createElement('div');
    messageInfo.style.fontWeight = 'bold';
    messageInfo.textContent = `${message.created_at} ${message.user}`;
    chatBubble.appendChild(messageInfo);
    const textContainer = document.createElement('div');
    const messageText = document.createElement('span');
    messageText.className = 'wrap-text';
    messageText.textContent = message.text;
    textContainer.appendChild(messageText);
    chatBubble.appendChild(textContainer);
    messageLine.appendChild(chatBubble);
    messagesContainer.appendChild(messageLine);

    const textBox = document.getElementById('textBox');
    textBox.scrollIntoView();
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
        option.innerHTML = `<i class='fas fa-${icon}' value='${key}'></i>`;
        option.addEventListener('click', (ev) => {
            const value = ev.target.getAttribute('value');
            iconBox.value = value;
            iconBox.innerHTML = `<i class='fas fa-${icons[value]}'></i>`;
            select.style.display = 'none';
        });
        select.appendChild(option);
    });
    selectContainer.appendChild(select);
};

const logout = () => {
    return new Promise(function(resolve, reject) {
        chat.emit('close-connection');
        resolve();
    });
};
