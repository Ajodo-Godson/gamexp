import React, { useState, useEffect } from 'react';
import styles from '../styles/Sudoku.module.scss';

// Function to check if a move is valid
const isValidMove = (board, row, col, value) => {
  if (board[row].includes(value)) return false;

  for (let i = 0; i < 9; i++) {
    if (board[i][col] === value) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === value) return false;
    }
  }

  return true;
};

// Generate a full Sudoku solution
const generateFullSolution = () => {
  const board = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  const fillBoard = (row, col) => {
    if (row === 9) return true;

    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = col === 8 ? 0 : col + 1;

    const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    for (let num of numbers) {
      if (isValidMove(board, row, col, num)) {
        board[row][col] = num;
        if (fillBoard(nextRow, nextCol)) return true;
        board[row][col] = 0;
      }
    }

    return false;
  };

  fillBoard(0, 0);
  return board;
};

// Create a Sudoku puzzle by removing numbers
const createPuzzle = (fullBoard, clues = 30) => {
  const puzzle = fullBoard.map(row => [...row]);
  let cellsToRemove = 81 - clues;

  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      cellsToRemove--;
    }
  }

  return puzzle;
};

// Generate a Sudoku puzzle
const generateSudokuPuzzle = (clues = 30) => {
  const solution = generateFullSolution();
  const puzzle = createPuzzle(solution, clues);
  return { puzzle, solution };
};

function Sudoku() {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const { puzzle, solution } = generateSudokuPuzzle(40); // 40 clues for an easy puzzle
    setBoard(puzzle);
    setInitialBoard(puzzle);
    setSolution(solution);
  }, []);

  const handleCellChange = (row, col, value) => {
    if (value === '' || (/^[1-9]$/.test(value) && isValidMove(board, row, col, parseInt(value, 10)))) {
      const newBoard = board.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? (value === '' ? 0 : parseInt(value, 10)) : cell
        )
      );
      setBoard(newBoard);
    }
  };

  const revealSolution = () => {
    setShowSolution(true);
  };

  return (
    <div className={styles.sudoku}>
      <h2>Sudoku</h2>
      <div className={styles.board}>
        {(showSolution ? solution : board).map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="number"
                min="1"
                max="9"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className={`${styles.cell} ${initialBoard[rowIndex][colIndex] !== 0 ? styles.fixed : ''}`}
                disabled={initialBoard[rowIndex][colIndex] !== 0 || showSolution}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={revealSolution} className={styles.revealButton}>
        Reveal Solution
      </button>
    </div>
  );
}

export default Sudoku;
