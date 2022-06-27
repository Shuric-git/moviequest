import { FC } from 'react';
import { Card } from 'antd';

import { IReqItem } from '../interfaces';
import 'antd/dist/antd.css';

const { Meta } = Card;

export const MovieItem: FC<{ itemProps: IReqItem }> = (props: { itemProps: IReqItem }) => {
  // , genre_ids,  release_date
  let { itemProps } = props;
  let { title, poster_path, overview } = itemProps;
  console.log(poster_path);
  return (
    <>
      <Card
        hoverable
        style={{ width: 454 }}
        cover={<img alt="example" src={`https://image.tmdb.org/t/p/original${poster_path}`} />}
      >
        <Meta title={title} description={overview} />
      </Card>
    </>
  );
};
