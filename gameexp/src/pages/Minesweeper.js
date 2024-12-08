import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Minesweeper.scss';

function Minesweeper() {
    const BOARD_SIZE = 10; // 10x10 grid
    const NUM_MINES = 10; // Number of mines

    const [board, setBoard] = useState([]);
    const [revealed, setRevealed] = useState([]);
    const [flags, setFlags] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    // Generate a new game
    const startNewGame = useCallback(() => {
        const newBoard = generateBoard();
        setBoard(newBoard);
        setRevealed(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(false)));
        setFlags(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(false)));
        setGameOver(false);
        setWin(false);
    }, []);

    useEffect(() => {
        startNewGame(); // Start a new game when the component mounts
    }, [startNewGame]);

    const generateBoard = () => {
        const board = Array(BOARD_SIZE)
            .fill()
            .map(() => Array(BOARD_SIZE).fill(0));

        let minesPlaced = 0;
        while (minesPlaced < NUM_MINES) {
            const row = Math.floor(Math.random() * BOARD_SIZE);
            const col = Math.floor(Math.random() * BOARD_SIZE);
            if (board[row][col] !== 'M') {
                board[row][col] = 'M';
                minesPlaced++;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const r = row + i;
                        const c = col + j;
                        if (
                            r >= 0 &&
                            r < BOARD_SIZE &&
                            c >= 0 &&
                            c < BOARD_SIZE &&
                            board[r][c] !== 'M'
                        ) {
                            board[r][c]++;
                        }
                    }
                }
            }
        }
        return board;
    };

    const revealCell = (row, col) => {
        if (gameOver || revealed[row][col] || flags[row][col]) return;

        const newRevealed = [...revealed];
        newRevealed[row][col] = true;
        setRevealed(newRevealed);

        if (board[row][col] === 'M') {
            setGameOver(true);
            alert('Game Over! You clicked on a mine.');
        } else if (board[row][col] === 0) {
            revealAdjacentCells(row, col, newRevealed);
        }

        if (checkWin(newRevealed)) {
            setWin(true);
            alert('Congratulations! You won!');
        }
    };

    const revealAdjacentCells = (row, col, newRevealed) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const r = row + i;
                const c = col + j;
                if (
                    r >= 0 &&
                    r < BOARD_SIZE &&
                    c >= 0 &&
                    c < BOARD_SIZE &&
                    !newRevealed[r][c] &&
                    !flags[r][c]
                ) {
                    newRevealed[r][c] = true;
                    if (board[r][c] === 0) {
                        revealAdjacentCells(r, c, newRevealed);
                    }
                }
            }
        }
        setRevealed([...newRevealed]);
    };

    const checkWin = (revealedCells) => {
        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (!revealedCells[r][c] && board[r][c] !== 'M') {
                    return false;
                }
            }
        }
        return true;
    };

    const toggleFlag = (e, row, col) => {
        e.preventDefault();
        if (gameOver || revealed[row][col]) return;

        const newFlags = [...flags];
        newFlags[row][col] = !newFlags[row][col];
        setFlags(newFlags);
    };

    return (
        <div>
            <h2>Minesweeper</h2>
            <button onClick={startNewGame} className="restart-button">
                Restart Game
            </button>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className={`cell ${revealed[rowIndex][colIndex]
                                        ? `revealed number-${cell}`
                                        : flags[rowIndex][colIndex]
                                            ? 'flagged'
                                            : ''
                                    }`}
                                onClick={() => revealCell(rowIndex, colIndex)}
                                onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
                            >
                                {revealed[rowIndex][colIndex]
                                    ? cell === 'M'
                                        ? '💣'
                                        : cell || ''
                                    : flags[rowIndex][colIndex]
                                        ? '🚩'
                                        : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {gameOver && <p className="game-over">Game Over!</p>}
            {win && <p className="win">You Won!</p>}
        </div>
    );
}

export default Minesweeper;
