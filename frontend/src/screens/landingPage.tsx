import { useNavigate } from "react-router-dom";
export function LandingPage() {
    const naigate = useNavigate();
    return (
        <div className = "flex justify-center">
            <div className = "pt-8 max-w-screen-lg">
                <div className = "grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className = "flex justify-center">
                        <img src = {"/chessboard.jpeg"} className = "max-w-96"></img>
                    </div>
                    <div className = "pt-16">
                        <div className = "flex justify-center">
                            <h1 className = "text-4xl font-bold text-white">
                                Play chess online with friends
                            </h1>
                        </div>

                        <div className = "mt-8 flex justify-center">
                            <button onClick = {() => {
                                naigate("/game");
                            }} className = "px-8 py-4 text-2xl bg-green-500 hover:bg-green-800 text-white font-bold rounded">Play Online</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}