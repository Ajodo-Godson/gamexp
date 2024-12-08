import React, { useState } from 'react';
import styles from '../styles/RockPaperScissors.scss';

function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const choices = ['rock', 'paper', 'scissors'];

  const handlePlayerChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    const gameResult = determineWinner(choice, computerChoice);
    setResult(gameResult);

    if (gameResult === 'You win!') setPlayerScore((prev) => prev + 1);
    if (gameResult === 'Computer wins!') setComputerScore((prev) => prev + 1);
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

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className={styles.rockPaperScissors}>
      <h2>Rock Paper Scissors</h2>
      <div className={styles.scores}>
        <p>Player Score: {playerScore}</p>
        <p>Computer Score: {computerScore}</p>
      </div>
      <div className={styles.choices}>
        {choices.map((choice) => (
          <button key={choice} onClick={() => handlePlayerChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {result && (
        <div className={styles.result}>
          <p>Your choice: {playerChoice}</p>
          <p>Computer's choice: {computerChoice}</p>
          <p>{result}</p>
          <button className={styles.resetButton} onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default RockPaperScissors;
