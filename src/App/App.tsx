import { useEffect, useState } from 'react';

import { MoviesList, ListSwitcher, MovieSearch, MovieDBService } from '../router';
import './App.css';
import { IReqItem } from '../interfaces';

function App() {
  const [search, setSearch] = useState('future');
  const [movies, setMovies] = useState<Array<IReqItem>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const movieDBService = new MovieDBService();

  useEffect(() => {
    console.log(movieDBService.getGuestSession());
  }, []);

  const searchMovie = (search: string, page: number = 1) => {
    setLoading(true);
    const searchedArr = movieDBService.getSearch(search, page);
    searchedArr
      .then((data: any) => {
        setMovies(data.results);
        setTotalPages(data.total_results);
        setSearch(search);
        setLoading(false);
      })
      .catch(() => onError());
  };

  const onError: () => void = () => {
    setError(true);
    setLoading(false);
  };

  const choosePage = (current: number) => {
    setMovies([]);
    setPage(current);
  };

  return (
    <div className="BG">
      <div className="container">
        <ListSwitcher />
        <MovieSearch searchMovie={searchMovie} />
        <MoviesList
          search={search}
          movies={movies}
          page={page}
          loading={loading}
          error={error}
          totalPages={totalPages}
          choosePage={choosePage}
          searchMovie={searchMovie}
        />
      </div>
    </div>
  );
}

export default App;
