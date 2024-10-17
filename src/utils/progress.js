export const saveProgress = async (game, progress) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('/api/users/progress', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ game, progress })
      });
  
      if (response.ok) {
        console.log('Progressi salvati con successo');
      } else {
        console.error('Errore nel salvataggio dei progressi');
      }
    } catch (error) {
      console.error('Errore di rete:', error);
    }
  };