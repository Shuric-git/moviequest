import { FC, useState, useEffect } from 'react';

import { MovieDBService } from '../services/movieDBService';
import { IReqItem } from '../interfaces';
import { MovieItem } from '../router';

// import { MovieItem } from '../MovieItem/MovieItem';

export const MoviesList: FC = () => {
  const [movies, setMovies] = useState<Array<IReqItem>>([]);

  const movieDBService = new MovieDBService();
  // const getMovie = () => {
  //   movieDBService.getMovie(3).then((item) => {
  //     console.log(item);
  //   });
  // };
  // getMovie();
  // let topRatedArr: IReqItem[] = [];
  // const getTopRated: () => void = async () => {
  //   topRatedArr = ;
  //   await setMovies(topRatedArr);
  // };

  useEffect(() => {
    const topRatedArr = movieDBService.getTopRated();
    topRatedArr.then((data: IReqItem[]) => setMovies(data));

    // setTimeout(() => console.log(topRatedArr), 1000);
  }, []);
  const elements = movies.map((item: IReqItem) => {
    // let { title, genre_ids, poster_path, owerview, release_date } = item;
    return (
      <li key={Math.random() * 1000}>
        <MovieItem itemProps={item} />
      </li>
    );
  });
  return <ul className="moviesList">{elements}</ul>;
};
