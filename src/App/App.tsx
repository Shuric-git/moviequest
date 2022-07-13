import { useEffect, useState } from 'react';

import { MoviesList, ListSwitcher, MovieSearch, MovieDBService } from '../router';
import { GenresContext } from '../GenresContext/GenresContext';
import './App.css';
import { IReqItem, IPopular } from '../interfaces';

function App() {
  const [search, setSearch] = useState('return');
  const [showSearch, setShowSearch] = useState(true);
  const [movies, setMovies] = useState<Array<IReqItem>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [session, setSession] = useState('');
  const [genresState, setGenres] = useState<[]>([]);

  useEffect(() => {
    let genres = MovieDBService.getGenres();
    genres.then((data) => {
      setGenres(data.genres);
    });
    let guestSession = MovieDBService.getGuestSession();
    guestSession.then((data: { guest_session_id: string }) => {
      setSession(data.guest_session_id);
    });
    localStorage.clear();
  }, []);

  const searchMovie = (search: string, page: number = 1) => {
    setLoading(true);
    const searchedArr = MovieDBService.getSearch(search, page);
    searchedArr
      .then((data: IPopular) => {
        setMovies(data.results);
        setTotalPages(data.total_results);
        setSearch(search);
        setLoading(false);
        setShowSearch(true);
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

  const rateMovie = (movieId: number, rating: number) => {
    MovieDBService.rateMovie(movieId, rating, session);
  };

  const getRated = () => {
    let rated = MovieDBService.getRated(session);
    rated.then((data) => {
      setMovies(data.results);
      setTotalPages(data.total_results);
      setShowSearch(false);
    });
  };

  return (
    <GenresContext.Provider value={genresState}>
      <div className="BG">
        <div className="container">
          <ListSwitcher getRated={getRated} searchMovie={searchMovie} search={search} />
          {showSearch ? <MovieSearch searchMovie={searchMovie} /> : null}
          <MoviesList
            search={search}
            movies={movies}
            page={page}
            loading={loading}
            error={error}
            totalPages={totalPages}
            choosePage={choosePage}
            searchMovie={searchMovie}
            rateMovie={rateMovie}
          />
        </div>
      </div>
    </GenresContext.Provider>
  );
}

export default App;
