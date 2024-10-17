import React, { useState, useEffect } from 'react';
import './Sudoku.css';

const SIZE = 9;

const generateEmptyBoard = () => Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));

const isSafe = (board, row, col, num) => {
    for (let x = 0; x < SIZE; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) return false;
        }
    }
    return true;
};

// Funzione per risolvere il Sudoku
const solveSudoku = (board) => {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= SIZE; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false; // Nessuna soluzione possibile
            }
        }
    }
    return true; // Soddisfa tutte le condizioni del Sudoku
};

const generateSudoku = () => {
    const board = generateEmptyBoard();

    for (let i = 0; i < SIZE; i += 3) {
        fillDiagonalBox(board, i, i);
    }

    solveSudoku(board);

    return board;
};

const fillDiagonalBox = (board, row, col) => {
    let num;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            do {
                num = Math.floor(Math.random() * 9) + 1;
            } while (!isSafe(board, row + i, col + j, num));
            board[row + i][col + j] = num;
        }
    }
};

// Risolvi il Sudoku e conta le soluzioni
const countSolutions = (board) => {
    let count = 0;
    const solve = () => {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= SIZE; num++) {
                        if (isSafe(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve()) count++;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };
    solve();
    return count;
};

const removeNumbersWithUniqueSolution = (board, attempts) => {
    let count = attempts;
    while (count > 0) {
        const i = Math.floor(Math.random() * SIZE);
        const j = Math.floor(Math.random() * SIZE);
        const backup = board[i][j];
        if (board[i][j] !== 0) {
            board[i][j] = 0;
            if (countSolutions(board) !== 1) {
                board[i][j] = backup; // Ripristina se non ha una sola soluzione
            } else {
                count--;
            }
        }
    }
};

const Sudoku = () => {
    const [board, setBoard] = useState(generateEmptyBoard());
    const [originalBoard, setOriginalBoard] = useState(generateEmptyBoard());
    const [message, setMessage] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [timer, setTimer] = useState(0);
    const [selectedCell, setSelectedCell] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        generateNewPuzzle();
    }, [difficulty]);

    const generateNewPuzzle = () => {
        const newBoard = generateSudoku();
        const attempts = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 40 : 50;
        removeNumbersWithUniqueSolution(newBoard, attempts);
        setBoard(newBoard);
        setOriginalBoard(newBoard.map(row => row.slice()));
        setMessage('');
        setTimer(0);
        localStorage.setItem('sudokuBoard', JSON.stringify(newBoard));
    };

    const handleChange = (row, col, value) => {
        if (value === '' || /^[1-9]$/.test(value)) {
            const newBoard = board.map((r, i) =>
                r.map((cell, j) => (i === row && j === col ? (value === '' ? 0 : parseInt(value)) : cell))
            );
            setBoard(newBoard);
        }
    };

    const resetBoard = () => {
        setBoard(originalBoard.map(row => row.slice()));
        setMessage('');
    };

    const checkSolution = () => {
        if (isValidSolution(board)) {
            setMessage('🎉 Soluzione corretta!');
        } else {
            setMessage('❌ Soluzione errata. Riprova.');
        }
    };

    const isValidSolution = (board) => {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                const num = board[row][col];
                if (num === 0 || !isSafe(board, row, col, num)) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleSelectCell = (row, col) => {
        setSelectedCell({ row, col });
    };

    return (
        <div className="sudoku-container">
            <h1>Sudoku</h1>
            <div className="difficulty">
                <label>Seleziona Difficoltà:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Facile</option>
                    <option value="medium">Medio</option>
                    <option value="hard">Difficile</option>
                </select>
            </div>
            <div className="timer">Tempo trascorso: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</div>
            <div className="sudoku-grid">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row.map((cell, colIndex) => (
                            <input
                                key={colIndex}
                                type="text"
                                maxLength="1"
                                value={cell !== 0 ? cell : ''}
                                onClick={() => handleSelectCell(rowIndex, colIndex)}
                                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                className={`sudoku-cell 
                                    ${originalBoard[rowIndex][colIndex] !== 0 ? 'original' : ''} 
                                    ${selectedCell && (selectedCell.row === rowIndex || selectedCell.col === colIndex || 
                                    Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) && Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3)) ? 'highlight' : ''}`}
                                readOnly={originalBoard[rowIndex][colIndex] !== 0}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button onClick={resetBoard}>Reset</button>
                <button onClick={checkSolution}>Controlla Soluzione</button>
                <button onClick={generateNewPuzzle}>Nuovo Gioco</button>
            </div>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default Sudoku;
