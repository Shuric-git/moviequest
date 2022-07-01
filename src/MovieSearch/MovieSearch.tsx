import { FC, KeyboardEvent, useState } from 'react';

export const MovieSearch: FC<{ searchMovie: (query: string) => void }> = ({ searchMovie }) => {
  const [input, setInput] = useState('');

  const submitSearch: (e: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      searchMovie(input);
    }
  };

  return (
    <>
      <input onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => submitSearch(e)} />
    </>
  );
};
