import { ChangeEvent } from 'react';

interface IReqItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<string>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  rating: number;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rateMovie: (movieId: { id: number }, rating: { e: ChangeEvent<HTMLInputElement> }) => void;
}

interface IMovieList {
  choosePage: (current: number) => void;
  searchMovie: (search: string, page: number) => void;
  rateMovie: (movieId: number, rating: number) => void;
  search: string;
  page: number;
  movies: IReqItem[];
  loading: boolean;
  error: boolean;
  totalPages: number;
}

interface IPopular {
  page: number;
  results: Array<IReqItem>;
  total_pages: number;
  total_results: number;
}

interface IListSwitcher {
  getRated: () => void;
  searchMovie: (query: string) => void;
  search: string;
}

interface IMovieItem {
  itemProps: IReqItem;
  rateMovie: (movieId: number, rating: number) => void;
}

export type { IReqItem, IPopular, IListSwitcher, IMovieItem, IMovieList };
