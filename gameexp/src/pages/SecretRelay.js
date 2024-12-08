import React, { useState } from 'react';

function SecretRelay() {
    const [secretWord, setSecretWord] = useState(null); // The secret word
    const [roles, setRoles] = useState({ conspirators: [], decoders: [] }); // Player roles
    const [currentWord, setCurrentWord] = useState(''); // Current word being played
    const [wordHistory, setWordHistory] = useState([]); // Words already played
    const [gameOver, setGameOver] = useState(false); // Game state
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Turn tracking
    const [players, setPlayers] = useState([]); // List of players
    const [showRules, setShowRules] = useState(true); // Toggle to show/hide rules

    const generateRandomWord = () => {
        const wordList = ['apple', 'banana', 'orange', 'sun', 'moon', 'ocean']; // Replace with a better word source
        return wordList[Math.floor(Math.random() * wordList.length)];
    };

    const setupGame = () => {
        // Example setup: split players into conspirators and decoders
        const allPlayers = ['Player1', 'Player2', 'Player3', 'Player4']; // Replace with actual input
        setPlayers(allPlayers);
        setRoles({
            conspirators: allPlayers.slice(0, 2),
            decoders: allPlayers.slice(2),
        });
        setSecretWord(generateRandomWord());
        setCurrentWord(generateRandomWord()); // Starting word
        setWordHistory([]);
        setGameOver(false);
        setCurrentPlayerIndex(0);
        setShowRules(false); // Hide rules once the game starts
    };

    const handleTurn = (word) => {
        if (wordHistory.includes(word)) {
            alert('Word already used! Try another.');
            return;
        }
        setWordHistory([...wordHistory, word]);
        setCurrentWord(word);

        if (word === secretWord) {
            setGameOver(true);
            alert(`Game Over! ${players[currentPlayerIndex]} guessed the secret word!`);
        } else {
            // Move to the next player
            setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        }
    };

    if (showRules) {
        return (
            <div>
                <h2>Secret Relay - Rules</h2>
                <ul>
                    <li>Players are divided into two roles: Conspirators and Decoders.</li>
                    <li>Conspirators know the secret word and guide the Decoders subtly toward it.</li>
                    <li>Decoders take turns guessing related words to find the secret word.</li>
                    <li>The game starts with a random word, and each player must say a word related to the previous one.</li>
                    <li>Words cannot be repeated during the game.</li>
                    <li>Conspirators cannot explicitly state or hint at the secret word.</li>
                    <li>The game ends when the secret word is said aloud.</li>
                </ul>
                <button onClick={setupGame}>Start Game</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Secret Relay</h2>
            <p>
                Secret Word (Conspirators Only):{' '}
                {roles.conspirators.includes(players[currentPlayerIndex]) ? secretWord : '???'}
            </p>
            <p>Current Word: {currentWord}</p>
            <p>Turn: {players[currentPlayerIndex]}</p>
            <p>Word History: {wordHistory.join(', ')}</p>

            {!gameOver ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter a related word"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleTurn(e.target.value);
                        }}
                    />
                </div>
            ) : (
                <p>Game Over!</p>
            )}
        </div>
    );
}

export default SecretRelay;
