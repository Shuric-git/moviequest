import { FC } from 'react';

import './GenresItem.css';

export const GenresItem: FC<{ GenresItemProps: string }> = ({ GenresItemProps }) => {
  return <div className="genresItem">{GenresItemProps}</div>;
};
