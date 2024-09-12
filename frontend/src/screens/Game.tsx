import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import {Chess} from "chess.js";
import { useSocket } from "../hooks/useSocket";
export function Game() {
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const socket = useSocket();
    useEffect(() => {
        if(!socket) {
            return;
        }   
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch(message.type) {
                case "init_game":
                    setBoard(chess.board());
                    console.log("Game initialized");
                    break;
                case "move":
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Move made");
                    break;
                case "game_over":
                    console.log("Game over");
                    break;
                default:
                    console.log("Unknown message type");
            
            }
        }
    }, [socket])
    if(!socket) {
        return <div>Connecting...</div>
    }
    return  (
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-1g w-full">
                <div className="grid grid-cols-6 gap-4w-full">
                    <div className="col-span-4 w-full flex justify-center">
                    <ChessBoard chess = {chess} setBoard = {setBoard} board = {board} socket={socket}/>
                    </div> 
                    <div className = "col-span-2 w-full flex justify-center">
                        <div className = "pt-8">
                            <Button onClick={() => {socket.send(JSON.stringify({type : "init_game"}))}}>Play</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    );
}