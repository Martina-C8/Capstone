import React, { useState } from 'react';
import './Quiz.css';

const quizQuestions = [
  {
    question: 'Qual è la capitale della Francia?',
    options: ['Parigi', 'Roma', 'Berlino', 'Madrid'],
    correctAnswer: 0,
  },
  {
    question: 'Qual è il pianeta più vicino al sole?',
    options: ['Marte', 'Venere', 'Mercurio', 'Giove'],
    correctAnswer: 2,
  },
  {
    question: 'Chi ha scritto "La Divina Commedia"?',
    options: ['Dante Alighieri', 'Giovanni Boccaccio', 'Francesco Petrarca', 'Ludovico Ariosto'],
    correctAnswer: 0,
  },
  {
    question: 'Quanto fa 5 x 6?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1,
  },
  {
    question: 'Qual è l’elemento chimico con il simbolo O?',
    options: ['Oro', 'Osmio', 'Ossigeno', 'Oganesso'],
    correctAnswer: 2,
  },
  {
    question: 'Quale animale è noto per cambiare colore?',
    options: ['Geco', 'Coccodrillo', 'Camaleonte', 'Serpente'],
    correctAnswer: 2,
  },
  {
    question: 'In che anno è caduto il muro di Berlino?',
    options: ['1985', '1989', '1991', '1993'],
    correctAnswer: 1,
  },
  {
    question: 'Chi è l’autore del libro "1984"?',
    options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'Isaac Asimov'],
    correctAnswer: 0,
  },
  {
    question: 'Quanto dura un’ora?',
    options: ['60 minuti', '90 minuti', '100 minuti', '30 minuti'],
    correctAnswer: 0,
  },
  {
    question: 'Qual è il paese più grande del mondo?',
    options: ['Cina', 'Russia', 'Stati Uniti', 'Canada'],
    correctAnswer: 1,
  },
  {
    question: 'Chi è il fondatore di Microsoft?',
    options: ['Steve Jobs', 'Mark Zuckerberg', 'Elon Musk', 'Bill Gates'],
    correctAnswer: 3,
  },
  {
    question: 'Qual è il monte più alto del mondo?',
    options: ['Monte Everest', 'K2', 'Kilimanjaro', 'Monte Bianco'],
    correctAnswer: 0,
  },
  {
    question: 'Quanto fa 12 x 12?',
    options: ['124', '144', '132', '156'],
    correctAnswer: 1,
  },
  {
    question: 'Quale pianeta è noto per i suoi anelli?',
    options: ['Saturno', 'Marte', 'Venere', 'Urano'],
    correctAnswer: 0,
  },
  {
    question: 'Quale continente ha la maggior parte della popolazione mondiale?',
    options: ['Africa', 'Asia', 'Europa', 'America'],
    correctAnswer: 1,
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index) => {
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setWrongAnswers(0);
    setFinished(false);
  };

  return (
    <div className="quiz">
      {finished ? (
        <div>
          <h1>Quiz Completato!</h1>
          <p>Punteggio: {score} risposte corrette</p>
          <p>{wrongAnswers} risposte sbagliate</p>
          <button onClick={resetQuiz}>Ricomincia</button>
        </div>
      ) : (
        <div>
          <h1>Domanda {currentQuestion + 1} di {quizQuestions.length}</h1>
          <p>{quizQuestions[currentQuestion].question}</p>
          <div className="options">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
