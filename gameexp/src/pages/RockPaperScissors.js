import React, { useState } from 'react';
import styles from '../styles/RockPaperScissors.scss';

function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [rounds, setRounds] = useState(0);

  const choices = ['rock', 'paper', 'scissors'];
  const MAX_ROUNDS = 5;

  const handlePlayerChoice = (choice) => {
    if (rounds >= MAX_ROUNDS) return;

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    const gameResult = determineWinner(choice, computerChoice);
    setResult(gameResult);

    if (gameResult === 'You win!') setPlayerScore((prev) => prev + 1);
    if (gameResult === 'Computer wins!') setComputerScore((prev) => prev + 1);

    setRounds((prev) => prev + 1);
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

  const resetScoresAndRounds = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setRounds(0);
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
        <p>Rounds Played: {rounds}/{MAX_ROUNDS}</p>
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
      {rounds === MAX_ROUNDS && (
        <div className={styles.overallResult}>
          <h3>
            {playerScore > computerScore
              ? 'Congratulations! You are the overall winner!'
              : playerScore < computerScore
                ? 'Computer wins the game!'
                : 'It\'s a tie!'}
          </h3>
          <button className={styles.resetButton} onClick={resetScoresAndRounds}>
            Play Again
          </button>
        </div>
      )}
      <button
        className={styles.resetButton}
        onClick={() => {
          setPlayerScore(0);
          setComputerScore(0);
        }}
      >
        Reset Scores
      </button>
    </div>
  );
}

export default RockPaperScissors;
