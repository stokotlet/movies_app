import React from 'react';
import './card-text.css';

const CardText = ({ title, date, overview, rating }) => {
  function truncate(str, n) {
    if (str.length > n) {
      let newStr = str.slice(0, n).split(' ').slice(0, -1).join(' ');
      return newStr + ' ...';
    } else return str;
  }
  let truncOverview = truncate(overview, 210);
  date = new Date(date);
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
  };
  date = date.toLocaleString('en-US', options);
  return (
    <div className="text-box">
      <div className="title-box">
        <div className="title">{title}</div>
        <span className="rating">{rating}</span>
      </div>
      <div className="release-date">{date}</div>
      <div className="genres">Action</div>
      <div className="overview">{truncOverview}</div>
    </div>
  );
};

export default CardText;
