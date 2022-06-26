// import {IMovieItem} from "../interfaces";

import { FC } from 'react';

import { IReqItem } from '../interfaces';

export const MovieItem: FC<IReqItem> = (props: IReqItem) => {
  let { itemProps } = props;
  let { title, genre_ids, poster_path, overview, release_date } = itemProps;
  console.log(title);
  return (
    <div className="itemWrapper">
      <div className="imgWrapper">
        <img src={poster_path} alt="" />
      </div>
      <div className="infoWrapper">
        <h5 className="movieItemTitle">{title}</h5>
        <span className="releaseDate">{release_date}</span>
        <div className="genresWrapper">{genre_ids}</div>
        <p className="overview">{overview}</p>
      </div>
    </div>
  );
};
