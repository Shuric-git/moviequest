import { FC } from 'react';
import { Card, Typography } from 'antd';
import { format } from 'date-fns';

import { GenresItem } from '../router';
import { IReqItem } from '../interfaces';
import './MovieItem.css';
import 'antd/dist/antd.css';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

export const MovieItem: FC<{ itemProps: IReqItem }> = (props: { itemProps: IReqItem }) => {
  //
  let { itemProps } = props;
  let { title, poster_path, overview, genre_ids, release_date } = itemProps;
  const genres = genre_ids.map((item) => {
    return (
      <div key={Math.random() * 1000}>
        <GenresItem GenresItemProps={item} />
      </div>
    );
  });
  return (
    <>
      <Card
        className="cardContainer"
        hoverable
        bordered={false}
        style={{ width: 454, height: 281, display: 'flex', overflow: 'hidden' }}
        cover={
          <img
            style={{ width: 183, height: 281 }}
            alt="example"
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
          />
        }
      >
        <div className="cardDescriptionWrapper">
          <Title className="movieItemTitle" level={5}>
            {title}
          </Title>
          <div className="releaseDate">{format(new Date(release_date), 'MMMM d, y')}</div>
          <div className="genresWrapper">{genres}</div>
          <Paragraph>{overview}</Paragraph>
        </div>
        <Meta />
      </Card>
    </>
  );
};
