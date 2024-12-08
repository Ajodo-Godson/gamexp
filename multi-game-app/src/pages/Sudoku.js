import React, { useState } from 'react';
import styles from '../styles/Sudoku.module.scss';

function Sudoku() {
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));

  const handleCellChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row][col] = value === '' ? 0 : parseInt(value, 10);
    setBoard(newBoard);
  };

  return (
    <div className={styles.sudoku}>
      <h2>Sudoku</h2>
      <div className={styles.board}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="number"
                min="1"
                max="9"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className={styles.cell}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sudoku;

