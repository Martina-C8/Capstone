import React, { useState, useEffect, useRef } from "react";
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Imposta un timer di 10 secondi
  const timerRef = useRef(null);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    resetTimer();
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line };
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningSquares([]);
    resetTimer(); // Resetta il timer quando si riavvia il gioco
  };

  const resetTimer = () => {
    setTimeLeft(10);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningSquares(result.line);
      if (result.winner === "X") {
        setScoreX(scoreX + 1);
      } else {
        setScoreO(scoreO + 1);
      }
      clearInterval(timerRef.current);
    } else if (board.every(Boolean)) {
      setWinner("Tie");
      clearInterval(timerRef.current);
    }
  }, [board]);

  useEffect(() => {
    // Se il timer raggiunge 0, cambia turno
    if (timeLeft === 0) {
      setIsXNext(!isXNext);
      resetTimer();
    }
  }, [timeLeft]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [isXNext]);

  const renderSquare = (index) => {
    const isWinningSquare = winningSquares.includes(index);
    return (
      <button
        className={`square ${isWinningSquare ? "winning-square" : ""}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="scoreboard">
        <p>Player X: {scoreX} | Player O: {scoreO}</p>
      </div>
      <div className="timer">
        <p>Time left for {isXNext ? "X" : "O"}: {timeLeft} seconds</p>
      </div>
      <div className="board-game">
        {board.map((_, index) => renderSquare(index))}
      </div>
      {winner && (
        <div className="winner-message">
          {winner === "Tie" ? <p>It's a tie!</p> : <p>{winner} wins!</p>}
        </div>
      )}
      <button className="reset-button" onClick={handleReset}>Reset Game</button>
    </div>
  );
};

export default TicTacToe;
