import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export function ChessBoard({ board, socket, chess, setBoard }: { board: ({ square: Square, type: PieceSymbol, color: Color } | null)[][], socket: WebSocket, chess : any, setBoard : any }) {
    const [from, setFrom] = useState<Square | null>(null);
    const [to, setTo] = useState<Square | null>(null);
    return (
        <div className="text-white-200">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((square, colIndex) => {
                        const squareRepresentation = String.fromCharCode(97 + (colIndex % 8)) + "" + (8 - rowIndex) as Square;
                        return (
                            <div onClick={() => {
                                if (!from) {
                                    setFrom(squareRepresentation);
                                } else {
                                    setTo(squareRepresentation);
                                    console.log("to is : " + squareRepresentation)
                                    socket.send(JSON.stringify({
                                         type: "move", 
                                         payload: { 
                                            move : { 
                                                    from, 
                                                    to: squareRepresentation 
                                                } 
                                            } 
                                        }));
                                    setFrom(null);
                                    chess.move({ from, to: squareRepresentation });
                                    setBoard(chess.board());
                                }
                            }} key={colIndex} className={`
                                w-16 h-16 flex items-center justify-center cursor-pointer
                                ${rowIndex % 2 === colIndex % 2 ? "bg-gray-500" : "bg-gray-300"}
                            `}>
                                {square ? square.type : ""}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
