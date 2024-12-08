import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navigation.module.scss';

function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/sudoku">Sudoku</Link></li>
                <li><Link to="/tictactoe">Tic Tac Toe</Link></li>
                <li><Link to="/rockpaperscissors">Rock Paper Scissors</Link></li>
                <li><Link to="/secretrelay">Secret Relay</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;

