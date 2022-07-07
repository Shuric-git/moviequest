import { FC, useEffect } from 'react';
import { Col, Row, Spin, Alert, Pagination } from 'antd';

import { IReqItem } from '../interfaces';
import { MovieItem } from '../router';

export const MoviesList: FC<{
  choosePage: (current: number) => void;
  searchMovie: (search: string, page: number) => void;
  rateMovie: (movieId: number, rating: number) => void;
  search: string;
  page: number;
  movies: IReqItem[];
  loading: boolean;
  error: boolean;
  totalPages: number;
}> = ({ choosePage, rateMovie, searchMovie, search, page, movies, loading, error, totalPages }) => {
  useEffect(() => {
    searchMovie(search, page);
    // eslint-disable-next-line
  }, [search, page]);
  const elements = movies.map((item: IReqItem) => {
    return (
      <Col span={12} key={Math.random() * 1000}>
        <MovieItem itemProps={item} rateMovie={rateMovie} />
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
          <Pagination
            current={page}
            onChange={(current) => {
              choosePage(current);
            }}
            defaultCurrent={1}
            total={totalPages}
            pageSize={20}
            showSizeChanger={false}
          />
        </>
      )}
    </>
  );
};
