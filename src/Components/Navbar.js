// src/components/Navbar.js
import React, { Component, Routes } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from './UserProfile';

const NavigationBar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Navbar fixed="top" bg="light" expand="lg" style={{ width: '100%' }}>
      <Navbar.Brand as={Link} to="/">Login</Navbar.Brand>
      <Navbar.Brand as={Link} to="/logout">Logout</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Giochi" id="basic-nav-dropdown">
            
                <NavDropdown.Item as={Link} to="/fifteen">Gioco del 15</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/sudoku">Sudoku</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/memory">Memory</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/quiz">Quiz</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tictactoe">Tic Tac Toe</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item> 
          
              
              
         
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
