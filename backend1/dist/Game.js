"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        console.log("Move of " + this.board.turn());
        // whites turn 
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        // black turn
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        // make the move
        try {
            this.board.move(move);
        }
        catch (_a) {
            console.log("Invalid move");
            return;
        }
        if (this.board.isGameOver()) {
            // send message to palyer 1 that game is over
            this.player1.send(JSON.stringify({
                type: "game_over",
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            // send message to palyer 2 that game is over
            this.player2.send(JSON.stringify({
                type: "game_over",
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        console.log("Move of " + this.board.turn());
        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: "move",
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: "move",
                payload: move
            }));
        }
        this.moveCount++;
        console.log("Move of " + this.board.turn());
    }
}
exports.Game = Game;
