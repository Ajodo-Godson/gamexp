import './App.css';
import RockPaperScissors from './components/RockPaperScissors';
import { Routes, Route } from "react-router-dom"; // Import both Routes and Route

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GameExp</h1>
      </header>
      <main>
        <Routes>
          {/* Define the path and the corresponding component */}
          <Route path="/" element={<RockPaperScissors />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
