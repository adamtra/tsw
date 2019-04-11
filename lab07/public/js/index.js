/* jshint esversion: 6, browser: true */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const newGameBtn = document.getElementById('newGame');
    newGameBtn.addEventListener('click', () => {
        let size = document.getElementById('size').valueAsNumber;
        let colors = document.getElementById('colors').valueAsNumber;
        let steps = document.getElementById('steps').valueAsNumber;
        if (isNaN(size) || isNaN(colors) || isNaN(steps)) {
            swal({
                title: 'Źle uzupełniono',
                text: 'Wszystkie pola muszą być liczbami!',
                icon: 'error',
            });
            return false;
        }
        if (size <= 0 || colors <= 0 || steps < 0) {
            swal({
                title: 'Źle uzupełniono',
                text: 'Wszystkie pola muszą być liczbami naturalnymi!',
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
            Object.assign(request, {
                steps: steps,
            });
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
            localStorage.setItem('lastMove', '');
            localStorage.setItem('colorCodes', '');
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
                    showResult({
                        won: false,
                        msg: '',
                    });
                    localStorage.clear();
                    renderGame();
                });
            } else {
                const data = getGameData();
                if (Number.parseInt(data.size) !== response.result.black) {
                    showResult({
                        won: false,
                        msg: `Ilość białych: ${response.result.white} Ilość czarnych: ${response.result.black}`,
                    });
                } else {
                    showResult({
                        msg: 'Wygrałeś!',
                        won: true,
                    });
                }
            }
        }
    };
    sendRequest();
};

const getMoves = () => {
    const moves = [];
    const inputs = document.querySelectorAll('.square-input');
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
      lastMove: localStorage.getItem('lastMove'),
      colorCodes: localStorage.getItem('colorCodes'),
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
    const colors = ['#ffffff'];
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
    const gameArea = document.getElementById('gameArea');
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }
    const data = getGameData();
    const gameSize = Number(data.size);
    const lastMoves = data.lastMove === null ? [] : data.lastMove.split(',');
    const colorCodes = data.colorCodes === null ? [] : data.colorCodes.split(',');
    for (let i = 0; i < gameSize; i++) {
        const newSelect = document.createElement('select');
        newSelect.className = 'square-input';
        colorCodes.forEach((color, key) => {
           const option = document.createElement('option');
           option.value = key;
           option.style.backgroundColor = color;
           newSelect.appendChild(option);
        });
        newSelect.addEventListener('change', (ev) => {
            ev.target.style.backgroundColor = colorCodes[ev.target.value];
        });
        if (lastMoves.length === gameSize) {
            newSelect.value = lastMoves[i];
            newSelect.style.backgroundColor = colorCodes[newSelect.value];
        }
        gameArea.append(newSelect);
    }
    if (data.game !== null) {
     const sendButton = document.createElement('button');
        sendButton.addEventListener('click', () => {
            const moves = getMoves();
            if (moves.length === gameSize) {
                localStorage.setItem('lastMove', moves);
                const request = {
                    move: moves,
                    game: data.game,
                };
                sendMove(request);
            } else {
                swal({
                    title: 'Źle uzupełniono',
                    text: `Uzupełnij wszystkie pola liczbami z zakresu 1 - ${data.colors}`,
                    icon: 'error',
                });
            }
        });
        sendButton.textContent = 'Wyślij';
        sendButton.className = 'btn btn-primary';
        sendButton.style.display = 'block';
        sendButton.style.marginTop = '20px';
        gameArea.append(sendButton);
    }
};

const showResult = (result) => {
    const gameResult = document.getElementById('gameResult');
    while (gameResult.firstChild) {
        gameResult.removeChild(gameResult.firstChild);
    }
    if (result.won) {
        swal({
            title: 'Gratulacje',
            text: 'Wygrana!',
            icon: 'success',
        });
    } else {
        const resultSpan = document.createElement('span');
        resultSpan.textContent = result.msg;
        gameResult.appendChild(resultSpan);
    }
};

