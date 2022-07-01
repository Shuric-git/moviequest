import { useState } from 'react';

import { MoviesList, ListSwitcher, MovieSearch } from '../router';
import './App.css';

function App() {
  const [search, setSearch] = useState('future');
  // const movieDBService = new MovieDBService();

  const searchMovie = (query: string) => {
    setSearch(query);
  };

  return (
    <div className="BG">
      <div className="container">
        <ListSwitcher />
        <MovieSearch searchMovie={searchMovie} />
        <MoviesList search={search} />
      </div>
    </div>
  );
}

export default App;
