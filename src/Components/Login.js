import React, { useState } from 'react';
import './Login.css'; // Assicurati di importare il tuo CSS
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login success:', data);
      navigate('/fifteen');
      // Salva il token o gestisci la logica di autenticazione
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Reindirizza alla pagina di registrazione quando si clicca sul bottone
  };

  return (
      <div className="container">
      <div className="square1">
        <i style={{ '--clr': '#327aba' }}></i>
        <i style={{ '--clr': '#381cc4' }}></i>
        <i style={{ '--clr': '#5421b3' }}></i>
        <div className="login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBx">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputBx">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="inputBx">
              <input type="submit" value="Sign in" />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="links">
            </div>
            <div className="inputBx">
            <div className="inputBx">
            <p style={{ color: 'white' }}>
            Don't have an account? <Link to="/signup">Sign Up</Link><br></br>
            Sign in with <Link to="/">google</Link>
          </p></div>           
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 