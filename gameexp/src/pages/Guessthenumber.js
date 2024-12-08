import React, { useState } from 'react';
import styles from '../styles/Guessthenumber.scss';

function GuessTheNumber() {
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    }

    const handleGuess = () => {
        const numGuess = parseInt(guess, 10);
        if (isNaN(numGuess)) {
            setFeedback('Please enter a valid number.');
            return;
        }
        setAttempts((prev) => prev + 1);
        if (numGuess === targetNumber) {
            setFeedback(`Congratulations! You guessed it in ${attempts + 1} attempts.`);
        } else if (numGuess < targetNumber) {
            setFeedback('Too low! Try again.');
        } else {
            setFeedback('Too high! Try again.');
        }
        setGuess('');
    };

    const resetGame = () => {
        setTargetNumber(generateRandomNumber());
        setGuess('');
        setFeedback('');
        setAttempts(0);
    };

    return (
        <div className={styles.guessTheNumber}>
            <h2>Guess the Number</h2>
            <p>I'm thinking of a number between 1 and 100. Can you guess it?</p>
            <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
            />
            <button onClick={handleGuess}>Submit</button>
            <p>{feedback}</p>
            {feedback.includes('Congratulations') && (
                <button onClick={resetGame}>Play Again</button>
            )}
        </div>
    );
}

export default GuessTheNumber;
