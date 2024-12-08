import React from 'react';
import styles from '../styles/Home.module.scss';

function Home() {
  return (
    <div className={styles.home}>
      <h1>Welcome to the Multi-Game App</h1>
      <p>Choose a game from the navigation menu to start playing!</p>
    </div>
  );
}

export default Home;

