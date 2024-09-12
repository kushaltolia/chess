import { WebSocket } from "ws";
import {Chess} from "chess.js";
export class Game {
    public player1 : WebSocket;
    public player2 : WebSocket;
    public board : Chess;
    public startTime : Date;
    public moveCount = 0;

    constructor (player1 : WebSocket, player2 : WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type : "init_game",
            payload : {
                color : "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type : "init_game",
            payload : {
                color : "black"
            }
        }))
    }
    makeMove(socket : WebSocket, move : any) {
        console.log("Move of " + this.board.turn());
        // whites turn 
        if(this.moveCount %2 === 0 && socket !== this.player1) {
            return;
        }
        // black turn
        if(this.moveCount %2 === 1 && socket !== this.player2) {
            return;
        }
        // make the move
        try {
            this.board.move(move);
        } catch {
            console.log("Invalid move");
            return;
        }
        if(this.board.isGameOver()) {
            // send message to palyer 1 that game is over
            this.player1.send(JSON.stringify({
                type : "game_over",
                payload : {
                    winner : this.board.turn() === "w" ? "black" : "white"
                }
            }))
            // send message to palyer 2 that game is over
            this.player2.send(JSON.stringify({
                type : "game_over",
                payload : {
                    winner : this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }
        console.log("Move of " + this.board.turn());
        if(this.moveCount % 2 === 0 ) {
            this.player2.send(JSON.stringify({
                type : "move",
                payload : move
            }))
        } else {
            this.player1.send(JSON.stringify({
                type : "move",
                payload : move
            }))
        }
        this.moveCount++;
        console.log("Move of " + this.board.turn());
    }
}