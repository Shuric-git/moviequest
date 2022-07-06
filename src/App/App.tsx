import { useEffect, useState } from 'react';

import { MoviesList, ListSwitcher, MovieSearch, MovieDBService } from '../router';
import { GenresContext } from '../GenresContext/GenresContext';
import './App.css';
import { IReqItem } from '../interfaces';

function App() {
  const [search, setSearch] = useState('return');
  const [showSearch, setShowSearch] = useState(true);
  const [movies, setMovies] = useState<Array<IReqItem>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [session, setSession] = useState('');
  const [genres, setGenres] = useState<any>({});

  const movieDBService = new MovieDBService();

  useEffect(() => {
    let guestSession = movieDBService.getGuestSession();
    guestSession.then((data: any) => {
      setSession(data.guest_session_id);
    });
    let genres = movieDBService.getGenres();
    genres.then((data) => {
      setGenres(data);
    });
    console.log(genres);
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
    movieDBService.rateMovie(movieId, rating, session);
  };

  const getRated = () => {
    let rated = movieDBService.getRated(session);
    rated.then((data) => {
      console.log(data);
      setMovies(data.results);
      setTotalPages(data.total_results);
      setShowSearch(false);
    });
  };

  return (
    <GenresContext.Provider value={genres}>
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
