import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Funzione per gestire il logout
    const handleLogout = () => {
      // Rimuovi il token o altri dati di autenticazione dal localStorage o sessionStorage
      localStorage.removeItem('token');
      
      // Mostra l'alert per confermare il logout
      alert('Logout avvenuto con successo');
      
      // Reindirizza alla pagina di login o home
      navigate('/login');
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;