/* jshint esversion: 6, browser: true */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const startNewGame = (request) => {
        let sendRequest, handleResponse;
        sendRequest = () => {
            var xhr = new XMLHttpRequest();
            xhr.onload = () => {
                handleResponse(xhr);
            };
            xhr.open("POST", "/game/new", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(request));
        };
        handleResponse = (xhr) => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                localStorage.setItem('game', response.game);
                localStorage.setItem('size', response.size);
                localStorage.setItem('colors', response.colors);
                localStorage.setItem('lastMove', '');
                renderGame();
            }
        };
        sendRequest();
    };
    const newGameBtn = document.getElementById('newGame');
    newGameBtn.addEventListener('click', () => {
        let size = document.getElementById('size').valueAsNumber;
        let colors = document.getElementById('colors').valueAsNumber;
        let steps = document.getElementById('steps').valueAsNumber;
        if (isNaN(size) || isNaN(colors) || isNaN(steps)) {
            alert('Wszystkie pola muszą być liczbami!');
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
    if (localStorage.getItem('game') !== null && localStorage.getItem('size') !== null && localStorage.getItem('colors') !== null) {
        renderGame();
    }
});

const sendMove = (request) => {
    let sendRequest, handleResponse;
    sendRequest = () => {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            handleResponse(xhr);
        };
        xhr.open("POST", "/game/move", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(request));
    };
    handleResponse = (xhr) => {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.hasOwnProperty('msg')) {
                showResult(response);
                localStorage.clear();
                renderGame();
            } else {
                const data = getGameData();
                if (Number.parseInt(data.size) !== response.result.black) {
                    showResult({
                        msg: `Ilość białych: ${response.result.white} Ilość czarnych: ${response.result.black}`,
                    });
                } else {
                    showResult({
                        msg: 'Wygrałeś!',
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
  };
};

const getRandomColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
};

const renderGame = () => {
    const gameArea = document.getElementById('gameArea');
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }
    const data = getGameData();
    const gameSize = Number(data.size);
    const lastMoves = data.lastMove === null ? [] : data.lastMove.split(',');
    for (let i = 0; i < gameSize; i++) {
        const newInput = document.createElement('input');
        newInput.className = 'square-input';
        if (lastMoves.length === gameSize) {
            newInput.value = lastMoves[i];
        }
        gameArea.append(newInput);
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
                alert(`Uzupełnij wszystkie pola liczbami z zakresu 1 - ${data.colors}`);
            }
        });
        sendButton.textContent = 'Wyślij';
        gameArea.append(sendButton);
    }
};

const showResult = (result) => {
    const gameResult = document.getElementById('gameResult');
    while (gameResult.firstChild) {
        gameResult.removeChild(gameResult.firstChild);
    }
    const resultSpan = document.createElement('span');
    resultSpan.textContent = result.msg;
    gameResult.appendChild(resultSpan);
};

