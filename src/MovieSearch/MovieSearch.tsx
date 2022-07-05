import { FC } from 'react';
import { debounce } from 'lodash';

import './MovieSearch.css';

export const MovieSearch: FC<{ searchMovie: (query: string) => void }> = ({ searchMovie }) => {
  const fn = (input: any) => {
    searchMovie(input);
  };

  const handleChange = (e: any) => {
    fn(e.target.value);
  };

  const debouncedFn = debounce(handleChange, 1000);

  return (
    <>
      <input
        className="movieSearch"
        placeholder="Type to search..."
        onChange={(e) => {
          debouncedFn(e);
        }}
      />
    </>
  );
};
