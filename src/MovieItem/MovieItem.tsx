import { FC } from 'react';
import { Card, Typography, Row, Col, Rate } from 'antd';
// import { format } from 'date-fns';

import { GenresItem } from '../router';
import { IReqItem } from '../interfaces';
import 'antd/dist/antd.css';
import './MovieItem.css';

const { Meta, Grid } = Card;
const { Title, Paragraph } = Typography;

export const MovieItem: FC<{ itemProps: IReqItem }> = ({ itemProps }) => {
  let { title, poster_path, overview, genre_ids, release_date } = itemProps;

  const descriptionShortener = (description: string): string => {
    const overviewArr = description.split(' ');
    overviewArr.length = 13;
    const shortOverview = overviewArr.join(' ');
    return shortOverview;
  };

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
        style={{ width: 454, height: 281, display: 'flex', overflow: 'hidden', padding: 0 }}
        cover={
          <img
            style={{ width: 183, height: 281 }}
            alt="example"
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
          />
        }
      >
        <Grid hoverable={false} style={{ width: 290, height: 281, paddingTop: 12, paddingLeft: 20 }}>
          <Col style={{ height: 260, position: 'relative' }}>
            <Row style={{ marginBottom: 10 }}>
              <Title className="movieItemTitle" level={5}>
                {title}
              </Title>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <div className="releaseDate">{release_date}</div>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <div className="genresWrapper">{genres}</div>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Paragraph style={{ overflow: 'hidden' }}>{descriptionShortener(overview)}</Paragraph>
            </Row>
            <Row style={{ position: 'absolute', bottom: 0, height: 46, alignItems: 'center' }}>
              <Rate style={{ fontSize: 15 }} count={10} allowHalf defaultValue={2.5} />
            </Row>
          </Col>
        </Grid>
        <Meta />
      </Card>
    </>
  );
};
