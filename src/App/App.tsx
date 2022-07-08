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
  const [genresState, setGenres] = useState<any>([]);

  const movieDBService = new MovieDBService();

  useEffect(() => {
    let genres = movieDBService.getGenres();
    genres.then((data) => {
      setGenres(data.genres);
    });
    let guestSession = movieDBService.getGuestSession();
    guestSession.then((data: any) => {
      setSession(data.guest_session_id);
    });
    localStorage.clear();
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
      setMovies(data.results);
      setTotalPages(data.total_results);
      setShowSearch(false);
    });
  };

  // const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // function useCurrentWidth() {
  //   // save current window width in the state object
  //   let [width, setWidth] = useState(getWidth());
  //
  //   // in this case useEffect will execute only once because
  //   // it does not have any dependencies.
  //   useEffect(() => {
  //     const resizeListener = () => {
  //       // change width from the state object
  //       setWidth(getWidth());
  //     };
  //     // set resize listener
  //     window.addEventListener('resize', resizeListener);
  //
  //     // clean up function
  //     return () => {
  //       // remove resize listener
  //       window.removeEventListener('resize', resizeListener);
  //     };
  //   }, []);
  //
  //   return width;
  // }

  // console.log(useCurrentWidth());

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
