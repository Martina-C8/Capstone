import React, { useState, useEffect } from 'react';
import './Memory.css'; // Assicurati di avere il file CSS

const cardsData = [
  { id: 1, image: 'https://via.placeholder.com/100?text=1' },
  { id: 2, image: 'https://via.placeholder.com/100?text=2' },
  { id: 3, image: 'https://via.placeholder.com/100?text=3' },
  { id: 4, image: 'https://via.placeholder.com/100?text=4' },
  { id: 5, image: 'https://via.placeholder.com/100?text=5' },
  { id: 6, image: 'https://via.placeholder.com/100?text=6' },
];

function Memory() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    resetGame(); // Inizializza il gioco
  }, []);

  const resetGame = () => {
    const shuffledCards = [...cardsData, ...cardsData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, isFlipped: false }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setTurns(0);
  };

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !cards[index].isFlipped) {
      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);
      setFlippedCards([...flippedCards, index]);

      if (flippedCards.length === 1) {
        const firstCard = cards[flippedCards[0]];
        const secondCard = newCards[index];

        if (firstCard.id === secondCard.id) {
          setMatchedCards([...matchedCards, firstCard.id]);
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            const resetCards = [...newCards];
            resetCards[flippedCards[0]].isFlipped = false;
            resetCards[index].isFlipped = false;
            setCards(resetCards);
            setFlippedCards([]);
          }, 1000);
        }
        setTurns(turns + 1);
      }
    }
  };

  return (
    <div className="memory">
      <h1>Memory Game</h1>
      <p>Turns: {turns}</p>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`memory-card ${card.isFlipped || matchedCards.includes(card.id) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {card.isFlipped || matchedCards.includes(card.id) ? (
              <img src={card.image} alt={`Card ${card.id}`} />
            ) : (
              <div className="memory-card-back">?</div>
            )}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={resetGame}>Restart Game</button>
      </div>
    </div>
  );
}

export default Memory;
