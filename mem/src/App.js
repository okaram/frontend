import './App.css';
import {MemoryGame} from './components/SimpleMemoryGame'
function App() {
  return (
    <div className="App">
      <header className="App-header">       
      </header>
      <MemoryGame numCards={12}/>
    </div>
  );
}

export default App;
