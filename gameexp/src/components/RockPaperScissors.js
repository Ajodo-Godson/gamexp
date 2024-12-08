import React, { useState } from 'react';
import '../styles/RockPaperScissors.scss';

function RockPaperScissors() {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState('');

    const choices = ['rock', 'paper', 'scissors'];

    const play = (choice) => {
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        setPlayerChoice(choice);
        setComputerChoice(computerChoice);

        if (choice === computerChoice) {
            setResult("It's a tie!");
        } else if (
            (choice === 'rock' && computerChoice === 'scissors') ||
            (choice === 'paper' && computerChoice === 'rock') ||
            (choice === 'scissors' && computerChoice === 'paper')
        ) {
            setResult('You win!');
        } else {
            setResult('Computer wins!');
        }
    };

    return (
        <div className="rock-paper-scissors">
            <h2>Rock Paper Scissors</h2>
            <div className="choices">
                {choices.map((choice) => (
                    <button key={choice} onClick={() => play(choice)}>
                        {choice}
                    </button>
                ))}
            </div>
            {playerChoice && computerChoice && (
                <div className="result">
                    <p>You chose: {playerChoice}</p>
                    <p>Computer chose: {computerChoice}</p>
                    <p className="winner">{result}</p>
                </div>
            )}
        </div>
    );
}

export default RockPaperScissors;

