import { FC, useState, useEffect } from 'react';
import { Col, Row, Spin, Alert } from 'antd';

import { IReqItem } from '../interfaces';
import { MovieItem, MovieDBService } from '../router';

export const MoviesList: FC = () => {
  const [movies, setMovies] = useState<Array<IReqItem>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const movieDBService = new MovieDBService();

  const onError: () => void = () => {
    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    const topRatedArr = movieDBService.getSearch('return');
    topRatedArr
      .then((data: IReqItem[]) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => onError());
    // eslint-disable-next-line
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
      {error ? (
        <Alert message="Jesus Christ it is Jason Burn!" description="He took your content!" type="error" closable />
      ) : loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>{elements}</Row>
      )}
    </>
  );
};
