import {WebSocketServer} from "ws";
import express from "express";
import { GameManager } from "./GameManager";
const app = express();
app.get("/", (req, res) => {
    console.log("New request");
})
const httpServer = app.listen(8080 , () => {
    console.log("Server started on http://localhost:8080");
})
const wss = new WebSocketServer({server : httpServer});
const gameManager = new GameManager();
wss.on('connection', function connection(ws) {
    console.log("New connection");
    gameManager.addUser(ws);
    ws.on('disconnect', () => gameManager.removeUser(ws));
})