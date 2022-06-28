import { FC } from 'react';
import { Card } from 'antd';

import { IReqItem } from '../interfaces';
import 'antd/dist/antd.css';

const { Meta } = Card;

export const MovieItem: FC<{ itemProps: IReqItem }> = (props: { itemProps: IReqItem }) => {
  //
  let { itemProps } = props;
  let { title, poster_path, overview, genre_ids, release_date } = itemProps;
  console.log(poster_path);
  return (
    <>
      <Card
        className="cardContainer"
        hoverable
        bordered={false}
        style={{ width: 454, height: 281, display: 'flex', overflow: 'hidden', fontFamily: 'Helvetica Neue' }}
        cover={
          <img
            style={{ width: 183, height: 281 }}
            alt="example"
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
          />
        }
      >
        <div className="cardDescriptionWrapper">
          <h5>{title}</h5>
          <div>{release_date}</div>
          <div>{genre_ids}</div>
          <p>{overview}</p>
        </div>

        <Meta />
      </Card>
    </>
  );
};
