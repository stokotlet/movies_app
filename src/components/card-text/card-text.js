import React from 'react';
import { Rate } from 'antd';
import './card-text.css';

const CardText = ({ title, date, overview, rating }) => {
  function truncate(str, n) {
    if (str.length > n) {
      let newStr = str.slice(0, n).split(' ').slice(0, -1).join(' ');
      return newStr + ' ...';
    } else return str;
  }

  const handleChange = (v) => {
    console.log(v);
  };
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
  return (
    <div className="text-box">
      <div className="title-box">
        <div className="title">{title}</div>
        <span className="rating">{rating}</span>
      </div>
      <div className="release-date">{date}</div>
      <div className="genres">Action</div>
      <div className="overview">{truncOverview}</div>
      <div className="set-rating">
        <Rate allowHalf defaultValue={0} onChange={handleChange} count={10} style={{ fontSize: 16 }} />
      </div>
    </div>
  );
};

export default CardText;
