"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const GameManager_1 = require("./GameManager");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    console.log("New request");
});
const httpServer = app.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
const gameManager = new GameManager_1.GameManager();
wss.on('connection', function connection(ws) {
    console.log("New connection");
    gameManager.addUser(ws);
    ws.on('disconnect', () => gameManager.removeUser(ws));
});
