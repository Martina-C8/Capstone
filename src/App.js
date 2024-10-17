// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './Components/Navbar';
import FifteenGame from './Components/FifteenGame';
import Sudoku from './Components/Sudoku';
import Memory from './Components/Memory';
import Quiz from './Components/Quiz';
import './Components/Navbar.css'
import TicTacToe from './Components/TicTacToe';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import {AuthProvider} from './contexts/AuthContext';
import UserProfile from './Components/UserProfile';
import Logout from './Components/Logout';

function App() {
  return (
    <AuthProvider>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/fifteen" element={<FifteenGame />} />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/" element={<Navigate to="/login" />} />        
        <Route path="/profile" element= {<UserProfile/>} />
        <Route path="/logout" element= {<Logout/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;