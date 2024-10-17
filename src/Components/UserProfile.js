import React from 'react';
import './UserProfile.css';

const UserProfileCustom = () => {
  // Supponiamo che tu voglia mostrare dati dinamici relativi all'utente
  const user = {
    name: "Martina Casetta",
    email: "casettamartina@libero.com",
    gamesPlayed: 5,
    highScores: {
      fifteenGame: 120,
      sudoku: 300,
      memory: 200,
      tictactoe: 150,
      quiz: 250,
    },
  };

  return (
    <div className="user-profile">
      <h1>Profilo di {user.name}</h1>
      <p>Email: {user.email}</p>
      <h3>Progressi nei Giochi</h3>
      <ul>
        <li>Gioco del 15: Punteggio massimo {user.highScores.fifteenGame}</li>
        <li>Sudoku: Punteggio massimo {user.highScores.sudoku}</li>
        <li>Memory: Punteggio massimo {user.highScores.memory}</li>
        <li>Tic Tac Toe: Punteggio massimo {user.highScores.tictactoe}</li>
        <li>Quiz: Punteggio massimo {user.highScores.quiz}</li>

      </ul>
      <p>Giochi giocati: {user.gamesPlayed}</p>
    </div>
  );
};

export default UserProfileCustom;
