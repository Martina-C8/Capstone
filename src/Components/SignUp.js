import React, { useState } from 'react';
import './Login.css'; // Usiamo lo stesso CSS del login
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      setSuccess('Registration successful!');
      console.log('Registration success:', data);

      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="square1">
        <i style={{ '--clr': '#327aba' }}></i>
        <i style={{ '--clr': '#381cc4' }}></i>
        <i style={{ '--clr': '#5421b3' }}></i>
        <div className="login">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBx">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="inputBx">
              <input
                type="email"
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
              <input 
                type="submit" 
                value="Sign Up" 
                className="submitButton"
              />
            </div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
