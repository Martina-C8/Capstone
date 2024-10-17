// src/components/FifteenGame.js
import React, { useState, useEffect } from 'react';
import '../Components/FifteenGame.css'


function FifteenGame() {
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [hint, setHint] = useState('');

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const initialBoard = [...Array(15).keys()].map(i => i + 1).concat(null);
    setBoard(shuffleArray(initialBoard));
    setHint(''); // Reset hint on restart
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };


  const handleMove = (index) => {
    const newBoard = [...board];
    const emptyIndex = newBoard.indexOf(null);
    if (canMove(emptyIndex, index)) {
      [newBoard[emptyIndex], newBoard[index]] = [newBoard[index], newBoard[emptyIndex]];
      setBoard(newBoard);
      setMoves(moves + 1);
      setHint(''); // Reset hint after a move
    }
  };

  const canMove = (emptyIndex, index) => {
    const validMoves = [
      emptyIndex - 1, // Sinistra
      emptyIndex + 1, // Destra
      emptyIndex - 4, // Su
      emptyIndex + 4  // Giù
    ];
    return validMoves.includes(index);
  };

  const handleRestart = () => {
    initializeBoard();
    setMoves(0);
  };

  const handleHint = () => {
    const emptyIndex = board.indexOf(null);
    const possibleMoves = [];

    // Controlla le posizioni adiacenti per suggerire un movimento
    if (emptyIndex % 4 !== 0) possibleMoves.push(emptyIndex - 1); // Sinistra
    if (emptyIndex % 4 !== 3) possibleMoves.push(emptyIndex + 1); // Destra
    if (emptyIndex - 4 >= 0) possibleMoves.push(emptyIndex - 4); // Su
    if (emptyIndex + 4 < 16) possibleMoves.push(emptyIndex + 4); // Giù

    if (possibleMoves.length > 0) {
      const hintIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      setHint(`Puoi muovere il pezzo ${board[hintIndex]} nello spazio vuoto.`);
    } else {
      setHint('Nessun suggerimento disponibile.');
    }
  };

  return (
    <div>
      <h1>Gioco del 15</h1>
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="tile" onClick={() => handleMove(index)}>
            {value}
          </div>
        ))}
      </div>
      <p>Moves: {moves}</p>
      <button className='reset-button' onClick={handleRestart}>Restart</button>
      <button className='hint-button' onClick={handleHint}>Hint</button>
      {hint && <p className="hint-message">{hint}</p>}
    </div>
  );
}



export default FifteenGame;
