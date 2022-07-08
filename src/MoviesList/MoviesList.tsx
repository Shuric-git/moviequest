import { FC, useEffect, useState } from 'react';
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
  const [colSpan, setColSpan] = useState(12);

  useEffect(() => {
    searchMovie(search, page);
    if (document.documentElement.clientWidth < 420) {
      console.log(document.documentElement.clientWidth);
      setColSpan(24);
    }
    // eslint-disable-next-line
  }, [search, page]);
  const elements = movies.map((item: IReqItem) => {
    console.log(colSpan);
    return (
      <Col span={colSpan} key={Math.random() * 1000}>
        <MovieItem itemProps={item} rateMovie={rateMovie} />
      </Col>
    );
  });
  window.addEventListener('resize', () => {
    document.documentElement.clientWidth < 420 ? setColSpan(24) : setColSpan(12);
  });

  return (
    <>
      {error ? (
        <Alert message="Jesus Christ it is Jason Burn!" description="He took your content!" type="error" closable />
      ) : loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Row style={{ marginBottom: 30 }} gutter={[36, 34]}>
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
