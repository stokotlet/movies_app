import React from 'react';

import { Consumer } from '../genres-context/genres-context';
import SetRating from '../set-rating/set-rating';
import './card-text.css';
import Genres from '../genres/genres';
// import genres from '../genres/genres';

const CardText = ({ title, date, overview, rating, movieId, guestId, isRated, genreIds }) => {
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
      <SetRating movieId={movieId} guestId={guestId} isRated={isRated} />
    </div>
  );
};

export default CardText;
