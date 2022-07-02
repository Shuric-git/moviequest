import { FC, useState, useRef, useEffect } from 'react';
import { debounce } from 'lodash';

import './MovieSearch.css';

export const MovieSearch: FC<{ searchMovie: (query: string) => void }> = ({ searchMovie }) => {
  const [input, setInput] = useState('');

  // const submitSearch: () => void = () => {
  //   searchMovie(input);
  // };
  const fn = (input: any) => {
    searchMovie(input);
    console.log('fn');
  };

  const debouncedFn = useRef(debounce(fn, 1000)).current;

  // const submitSearch: (e: KeyboardEvent<HTMLInputElement>) => void = (e) => {
  //   // if (e.key === 'Enter' || e.key === 'NumpadEnter') {
  //   debouncedFn();
  //   // }
  // };

  const handleChange = (e: any) => {
    setInput(e.target.value);
    debouncedFn(input);
    console.log('handle');
  };

  useEffect(() => {
    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedFn]);

  return (
    <>
      <input
        className="movieSearch"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e)}
        // onKeyDown={handleChange}
      />
    </>
  );
};

// const debounce = (fn: () => void, debounceTime: number) => {
//   let timerId: any;
//   return function () {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => {
//       fn.apply(this, arguments);
//     }, debounceTime);
//   };
// };
//
// // const submitSearch: () => void = () => {
// //   searchMovie(input);
// // };
// const fn = () => {
//   searchMovie(input);
// };
//
// const debouncedFn = debounce(fn, 1000);
