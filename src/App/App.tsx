import { MoviesList, ListSwitcher } from '../router';
import './App.css';

function App() {
  return (
    <div className="BG">
      <div className="container">
        <ListSwitcher />
        <MoviesList />
      </div>
    </div>
  );
}

export default App;
