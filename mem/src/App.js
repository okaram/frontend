import './App.css';
import {MemoryGame} from './components/SimpleMemoryGame'
function App() {
  return (
    <div className="App">
      <MemoryGame numCards={12}/>
    </div>
  );
}

export default App;
