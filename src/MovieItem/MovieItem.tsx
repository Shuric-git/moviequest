import { FC, useContext, useEffect, useState } from 'react';
import { Card, Typography, Rate, Image } from 'antd';
import { format } from 'date-fns';

import { GenresContext } from '../GenresContext/GenresContext';
import { GenresItem } from '../router';
import { IMovieItem } from '../interfaces';
import { fallbackImg } from '../assets/img';
import 'antd/dist/antd.css';
import './MovieItem.css';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

export const MovieItem: FC<IMovieItem> = ({ itemProps, rateMovie }) => {
  let { id, title, poster_path, overview, genre_ids, release_date, vote_average } = itemProps;

  const theme = useContext(GenresContext);

  const [ratingColor, setRatingColor] = useState('circle');

  if (theme === undefined) {
    throw new Error();
  }

  const [movieRating, setMovieRating] = useState(0);
  useEffect(() => {
    setMovieRating(Number(localStorage.getItem(String(id)) || '0'));
    if (vote_average < 3) {
      setRatingColor('circle circle-red');
    } else if (vote_average >= 3 && vote_average < 5) {
      setRatingColor('circle circle-orange');
    } else if (vote_average >= 5 && vote_average < 7) {
      setRatingColor('circle circle-yellow');
    } else if (vote_average >= 7) {
      setRatingColor('circle circle-green');
    }
  }, []);

  const descriptionShortener = (description: string): string => {
    const overviewArr = description.split(' ');
    overviewArr.length = 13;
    let shortOverview = overviewArr.join(' ');
    shortOverview += ' ...';
    return shortOverview;
  };

  const genres = theme.map((item: { id: string; name: string }) => {
    if (genre_ids.includes(item.id)) {
      return (
        <div key={Math.random() * 1000}>
          <GenresItem GenresItemProps={item.name} />
        </div>
      );
    }
  });
  return (
    <>
      <Card className="cardContainer" hoverable style={{ display: 'flex', padding: 0 }}>
        <Image
          className="cardImage"
          alt="example"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          fallback={fallbackImg}
        />
        <div className="cardDescriptionWrapper">
          <div className="cardDescriptionTop">
            <div className="cardHeadline">
              <Title className="movieItemTitle" level={5}>
                {title}
              </Title>
              <div className="averageRating">
                <div className={ratingColor}>
                  <span className="averageRatingCounter">{vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="releaseDate">
              {release_date ? format(new Date(release_date), 'MMMM d, y') : 'дата выхода неизвестна'}
            </div>
            <div className="genresWrapper">{genres}</div>
          </div>
          <Paragraph className="overview" style={{ overflow: 'hidden' }}>
            {descriptionShortener(overview)}
          </Paragraph>
          <div className="rate">
            <Rate
              style={{ fontSize: 15, position: 'absolute', bottom: 0, right: 0 }}
              count={10}
              allowHalf
              allowClear={false}
              defaultValue={0}
              value={movieRating}
              onChange={(ratingCounter) => {
                rateMovie(id, ratingCounter);
                setMovieRating(ratingCounter);
                localStorage.setItem(String(id), String(ratingCounter));
              }}
            />
          </div>
          <Meta />
        </div>
      </Card>
    </>
  );
};
