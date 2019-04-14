/* jshint esversion: 6, browser: true */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    body.addEventListener('click', () => {
       const uls = document.querySelectorAll('ul');
       uls.forEach(ul => {
           if (ul.style.display !== 'none') {
               ul.style.display = 'none';
           }
       });
    }, true);
    const newGameBtn = document.getElementById('newGame');
    newGameBtn.addEventListener('click', () => {
        let size = document.getElementById('size').valueAsNumber;
        let colors = document.getElementById('colors').valueAsNumber;
        let steps = document.getElementById('steps').valueAsNumber;
        if (isNaN(size) || isNaN(colors) || isNaN(steps) || size <= 0 || colors <= 0 || steps < 0) {
            swal({
                title: 'Źle uzupełniono',
                text: 'Wszystkie pola muszą być wybrane!',
                icon: 'error',
            });
            return false;
        }
        size = Math.round(size);
        colors = Math.round(colors);
        steps = Math.round(steps);
        const request = {
            size: size,
            colors: colors,
        };
        if (steps > 0) {
            request.steps = steps;
        }
        startNewGame(request);
    });
    const gameData = getGameData();
    if (gameData.game !== null && gameData.size !== null && gameData.colors !== null) {
        renderGame();
    }
});

const startNewGame = (request) => {
    let sendRequest, handleResponse;
    sendRequest = () => {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            handleResponse(xhr);
        };
        xhr.open('POST', '/game/new', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(request));
    };
    handleResponse = (xhr) => {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            localStorage.setItem('game', response.game);
            localStorage.setItem('size', response.size);
            localStorage.setItem('colors', response.colors);
            localStorage.setItem('colorCodes', '');
            localStorage.setItem('moveHistory', '');
            getColorArray(response.colors);
            renderGame();
        }
    };
    sendRequest();
};

const sendMove = (request) => {
    let sendRequest, handleResponse;
    sendRequest = () => {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            handleResponse(xhr);
        };
        xhr.open('POST', '/game/move', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(request));
    };
    handleResponse = (xhr) => {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.hasOwnProperty('msg')) {
                swal({
                    title: response.msg,
                    icon: 'error',
                }).then(() => {
                    localStorage.clear();
                    renderGame();
                });
            } else {
                const data = getGameData();
                addToMoveHistory(request.move, response.result);
                if (Number.parseInt(data.size) === response.result.black) {
                    swal({
                        title: 'Gratulacje',
                        text: 'Wygrana!',
                        icon: 'success',
                    }).then(() => {
                        const sendButton = document.getElementById('sendButton');
                        sendButton.style.display = 'none';
                        localStorage.clear();
                    });
                }
            }
        }
    };
    sendRequest();
};

const getMoves = () => {
    const moves = [];
    const inputs = document.querySelectorAll('.square-div');
    inputs.forEach(input => {
        const move = Math.round(input.value);
        if (!isNaN(move) && move >= 1 && move <= Number.parseInt(localStorage.getItem('colors'))) {
            moves.push(move);
        }
    });
    return moves;
};

const getGameData = () => {
  return {
      game: localStorage.getItem('game'),
      size: localStorage.getItem('size'),
      colors: localStorage.getItem('colors'),
      colorCodes: localStorage.getItem('colorCodes'),
      moveHistory: localStorage.getItem('moveHistory'),
  };
};

const rgbToHex = (rgb) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = `0${hex}`;
    }
    return hex;
};

const hsvToRGB = (h, s, v) => {
    const h_i = Math.floor(h * 6);
    const f = h * 6 - h_i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r, b, g;
    switch (h_i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return `#${rgbToHex(Math.ceil(r * 256))}${rgbToHex(Math.ceil(g * 256))}${rgbToHex(Math.ceil(b * 256))}`;
};


const getColorArray = (size) => {
    const colors = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    let h = 0;
    for (let i = 0; i < size; i++) {
        h += phi;
        h %= 1;
        const color = hsvToRGB(h, 0.99, 0.99);
        colors.push(color);
    }
    localStorage.setItem('colorCodes', colors);
};

const renderGame = () => {
    renderHistory();
    const gameArea = document.getElementById('gameArea');
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }
    const data = getGameData();
    const gameSize = Number(data.size);
    const colorCodes = data.colorCodes === null ? [] : data.colorCodes.split(',');
    for (let i = 0; i < gameSize; i++) {
        const selectContainer = document.createElement('div');
        selectContainer.className = 'square-div select-container';
        const colorBox = document.createElement('div');
        colorBox.className = 'square-div';
        colorBox.style.border = '1px solid black';
        colorBox.style.backgroundColor = 'white';
        colorBox.addEventListener('click', (ev) => {
           selectContainer.querySelector('ul').style.display = 'block';
        });
        selectContainer.appendChild(colorBox);
        const select = document.createElement('ul');
        select.style.display = 'none';
        colorCodes.forEach((color, key) => {
            const option = document.createElement('li');
            option.value = key + 1;
            option.style.backgroundColor = color;
            option.style.color = color;
            option.style.borderRadius = '100%';
            option.addEventListener('click', (ev) => {
              colorBox.value = ev.target.value;
              colorBox.style.backgroundColor = colorCodes[ev.target.value - 1];
              select.style.display = 'none';
            });
            select.appendChild(option);
        });
        selectContainer.appendChild(select);
        gameArea.append(selectContainer);
    }
    const sendButton = document.getElementById('sendButton');
    sendButton.style.display = 'block';
};

const checkMove = () => {
    const data = getGameData();
    const gameSize = Number(data.size);
    const moves = getMoves();
    if (moves.length === gameSize) {
        const request = {
            move: moves,
            game: data.game,
        };
        sendMove(request);
    } else {
        swal({
            title: 'Źle uzupełniono',
            text: `Uzupełnij wszystkie pola`,
            icon: 'error',
        });
    }
};

const renderHistory = () => {
    const previous = document.getElementById('previous');
    while (previous.firstChild) {
        previous.removeChild(previous.firstChild);
    }
    const data = getGameData();
    const gameSize = Number(data.size);
    const colorCodes = data.colorCodes === null ? [] : data.colorCodes.split(',');
    let history;
    try {
        history = JSON.parse(data.moveHistory);
    } catch (e) {
        history = [];
    }
    history.forEach( line => {
        const historyLine = document.createElement('div');
        historyLine.className = 'd-flex flex-row';
        const colorLine = document.createElement('div');
        colorLine.className = 'd-flex flex-row flex-wrap';
        const dots = document.createElement('div');
        dots.className = 'd-flex flex-row flex-wrap';
        for (let i = 0; i < gameSize; i++) {
            const colorBox = document.createElement('div');
            colorBox.className = 'square-div select-container';
            colorBox.style.border = '1px solid black';
            colorBox.style.backgroundColor = colorCodes[line.move[i] - 1];
            colorLine.appendChild(colorBox);
            const dot = document.createElement('div');
            dot.className = 'result-dot';
            if (i < line.dots.black) {
                dot.style.backgroundColor = 'black';
            } else if (i < line.dots.white + line.dots.black) {
                dot.style.backgroundColor = 'white';
            } else {
                dot.style.backgroundColor = 'lightgrey';
            }
            dots.appendChild(dot);
        }
        historyLine.appendChild(colorLine);
        historyLine.appendChild(dots);
        previous.appendChild(historyLine);
    });
};

const addToMoveHistory = (move, dots) => {
    const data = getGameData();
    const colorCodes = data.colorCodes === null ? [] : data.colorCodes.split(',');
    let history;
    try {
        history = JSON.parse(data.moveHistory);
    } catch (e) {
        history = [];
    }
    history.unshift({
        move: move,
        dots: dots,
    });
    localStorage.setItem('moveHistory', JSON.stringify(history));
    renderHistory();
};
