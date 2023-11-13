import {useState} from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import {WINNING_COMBINATIONS} from "./winning-combinations.js";


const initGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if ( gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }

    return currentPlayer;
}

function deriveWinner(board, players) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol = board[combination[0].row][combination[0].column];
        const secondSymbol = board[combination[1].row][combination[1].column];
        const thirdSymbol = board[combination[2].row][combination[2].column];

        if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
            winner = players[firstSymbol];
        }
    }
}

function deriveBoard(gameTurns) {
    let board = [...initGameBoard.map((array => [...array]))];

    for (const turn of gameTurns) {
        board[turn.square.row][turn.square.col] = turn.player;
    }

    return board;
}

function App() {

    const [gameTurns, setGameTurns] = useState([])
    const [players, setPlayers] = useState({
            'X' : 'Player 1',
            'O' : 'Player 2'
        },

    );

    let activePlayer = deriveActivePlayer(gameTurns);

    const board = deriveBoard(gameTurns);
    const winner = deriveWinner(board, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {

            const currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [
                { square: {row: rowIndex, col: colIndex}, player: currentPlayer }
                ,...prevTurns];

            return updatedTurns;
        });
    }

    function handleRestart() {
        setGameTurns([]);
    }

    function saveName(symbol, newName) {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} saveName={saveName}/>
                    <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} saveName={saveName}/>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
                <GameBoard onSelectSquare={handleSelectSquare} board = {board}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    )
}

export default App
