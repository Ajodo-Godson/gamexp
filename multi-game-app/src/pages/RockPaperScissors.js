import React, { useState } from 'react';
import styles from '../styles/RockPaperScissors.module.scss';

function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const choices = ['rock', 'paper', 'scissors'];

  const handlePlayerChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(determineWinner(choice, computerChoice));
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return 'Tie!';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'You win!';
    }
    return 'Computer wins!';
  };

  return (
    <div className={styles.rockPaperScissors}>
      <h2>Rock Paper Scissors</h2>
      <div className={styles.choices}>
        {choices.map((choice) => (
          <button key={choice} onClick={() => handlePlayerChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {playerChoice && computerChoice && (
        <div className={styles.result}>
          <p>Your choice: {playerChoice}</p>
          <p>Computer's choice: {computerChoice}</p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default RockPaperScissors;

