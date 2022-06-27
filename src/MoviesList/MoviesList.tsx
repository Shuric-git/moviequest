import { FC, useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import { IReqItem } from '../interfaces';
import { MovieItem, MovieDBService } from '../router';

export const MoviesList: FC = () => {
  const [movies, setMovies] = useState<Array<IReqItem>>([]);

  const movieDBService = new MovieDBService();

  useEffect(() => {
    const topRatedArr = movieDBService.getSearch('return');
    topRatedArr.then((data: IReqItem[]) => setMovies(data));
  }, []);
  const elements = movies.map((item: IReqItem) => {
    return (
      <Col span={12} key={Math.random() * 1000}>
        <MovieItem itemProps={item} />
      </Col>
    );
  });
  return (
    <>
      <Row gutter={[16, 16]}>{elements}</Row>
      {/*<ul className="moviesList"></ul>*/}
    </>
  );
};
