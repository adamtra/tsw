//jshint node: true, esversion: 6
'use strict';

let games = new Map();
const toMap = (tab) => {
    const tabMap = new Map();
    tab.forEach((value, index) => {
        if(!tabMap.has(value)) {
            tabMap.set(value, new Set());
        }
        tabMap.get(value).add(index);
    });
    return tabMap;
};

const ocena = (kod)  => {
    const kodMap = toMap(kod);
    return (ruch) => {
        const ruchMap = toMap(ruch);
        let response = {
            white: 0,
            black: 0,
        };
        kodMap.forEach((kodValue, kodIndex) => {
            if(ruchMap.has(kodIndex)) {
                const set = ruchMap.get(kodIndex);
                set.forEach((ruchIndex) => {
                    if(kodValue.has(ruchIndex)) {
                        response.black++;
                        kodValue.delete(ruchIndex);
                        set.delete(ruchIndex);
                    }
                });
                response.white += Math.min(kodValue.size, set.size);
            }
        });
        return response;
    };
};

const generateSolution = (size, colors) => {
    const min = 1;
    let game = [];
    for (let i = 0; i < size; i++) {
        game[i] = Math.floor(Math.random() * (colors - min + 1)) + min;
    }
    return game;
};

const express = require('express');
const router = express.Router();
const uuid = require('uuid');

router.route('/new').post((req, res) => {
    if (req.body.hasOwnProperty('size') && req.body.hasOwnProperty('colors')) {
        const gameId = uuid();
        const size = req.body.size;
        const colors = req.body.colors;
        const response = {
            game: gameId,
            size: size,
            colors: colors,
        };
        games.set(gameId, {
            size: size,
            colors: colors,
            solution: generateSolution(size, colors),
            solved: false,
        });
        if (req.body.hasOwnProperty('steps')) {
            response.steps = req.body.steps;
            games.get(gameId).steps = req.body.steps;
        }
        res.json(response);
    }
    res.json({
        msg: "Parameter missing",
    });
});
router.route('/status').post((req, res) => {
    const uid = req.body.game;
    const response = {
        game: uid,
        solved: games.get(uid).solved,
    };
    res.json(response);
});

router.route('/move').post((req, res) => {
    const uid = req.body.game;
    let game = games.get(uid);
    const check = ocena(game.solution);
    if (game.hasOwnProperty('steps')) {
        if (game.steps === 0) {
            res.json({
               msg: "No more moves",
            });
        } else {
            game.steps--;
        }
    }
    const result = check(req.body.move);
    game.solved = result.black === game.size;
    res.json({
        game: uid,
        result: result,
    });
});
module.exports = router;
