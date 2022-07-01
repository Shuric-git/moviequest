import { FC, useState, useEffect } from 'react';
import { Col, Row, Spin, Alert, Pagination } from 'antd';

import { IReqItem } from '../interfaces';
import { MovieItem, MovieDBService } from '../router';

export const MoviesList: FC<{ search: string }> = ({ search }) => {
  const [movies, setMovies] = useState<Array<IReqItem>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const movieDBService = new MovieDBService();

  const searchMovie = (search: string, page: number = 1) => {
    const searchedArr = movieDBService.getSearch(search, page);
    searchedArr
      .then((data: IReqItem[]) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => onError());
  };

  const choosePage = (currentPage: number) => {
    console.log(currentPage);
    setPage(currentPage);
    searchMovie(search, currentPage);
  };

  const onError: () => void = () => {
    setError(true);
    setLoading(false);
  };

  console.log(search);
  useEffect(() => {
    searchMovie(search);
    // eslint-disable-next-line
  }, [search]);
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
        <>
          <Row style={{ marginBottom: 30 }} gutter={[16, 16]}>
            {elements}
          </Row>
          <Pagination current={page} onChange={(current) => choosePage(current)} defaultCurrent={1} total={50} />
        </>
      )}
    </>
  );
};
