import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Sudoku from './pages/Sudoku';
import TicTacToe from './pages/TicTacToe';
import RockPaperScissors from './pages/RockPaperScissors';
import SecretRelay from './pages/SecretRelay';
import styles from './styles/App.module.scss';
import Minesweeper from './pages/Minesweeper';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Navigation />
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sudoku" element={<Sudoku />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/rockpaperscissors" element={<RockPaperScissors />} />
            <Route path="/secretrelay" element={<SecretRelay />} />
            <Route path="/minesweeper" element={<Minesweeper />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
