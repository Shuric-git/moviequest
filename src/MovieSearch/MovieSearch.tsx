import { FC, KeyboardEvent, useState } from 'react';

import './MovieSearch.css';

export const MovieSearch: FC<{ searchMovie: (query: string) => void }> = ({ searchMovie }) => {
  const [input, setInput] = useState('');

  const submitSearch: (e: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      searchMovie(input);
    }
  };

  return (
    <>
      <input
        className="movieSearch"
        placeholder="Type to search..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => submitSearch(e)}
      />
    </>
  );
};
