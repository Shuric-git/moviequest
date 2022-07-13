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
  rateMovie: (movieId: { id: number }, rating: { e: any }) => void;
}

interface IPopular {
  page: number;
  results: Array<IReqItem>;
  total_pages: number;
  total_results: number;
}

interface ISearch {
  page: number;
  results: Array<IReqItem>;
  total_pages: number;
  total_results: number;
}

export type { IReqItem, IPopular, ISearch };
