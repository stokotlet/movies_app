import React from 'react';
import '../card-text/card-text.css';
import { Rate } from 'antd';

import { Consumer } from '../genres-context/genres-context';
import Genres from '../genres/genres';

const RatedCardText = ({ title, date, overview, rating, userRating, genreIds }) => {
  function truncate(str, n) {
    if (str.length > n) {
      let newStr = str.slice(0, n).split(' ').slice(0, -1).join(' ');
      return newStr + ' ...';
    } else return str;
  }

  let truncOverview;
  if (title.length < 20) {
    truncOverview = truncate(overview, 210);
  } else {
    truncOverview = truncate(overview, 150);
  }

  date = new Date(date);
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
  };
  date = date.toLocaleString('en-US', options);
  let ratingClass;
  if (rating < 3) {
    ratingClass = 'rating rating-color1';
  } else if (rating >= 3 && rating < 5) {
    ratingClass = 'rating rating-color2';
  } else if (rating >= 5 && rating < 7) {
    ratingClass = 'rating rating-color3';
  } else {
    ratingClass = 'rating rating-color4';
  }
  return (
    <div className="text-box">
      <div className="title-box">
        <div className="title">{title}</div>
        <span className={ratingClass}>{rating}</span>
      </div>
      <div className="release-date">{date}</div>
      <Consumer>
        {(genres) => {
          return <Genres genreList={genres} genreIds={genreIds} />;
        }}
      </Consumer>
      <div className="overview">{truncOverview}</div>
      <div className="set-rating">
        <Rate allowHalf disabled defaultValue={userRating} count={10} style={{ fontSize: 16 }} />
      </div>
    </div>
  );
};

export default RatedCardText;
