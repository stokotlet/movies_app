import React from 'react';
import { Rate } from 'antd';

const SetRating = ({ movieId, guestId, isRated }) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=1cfe74af7757c33f37542e537da984f2&guest_session_id=${guestId}`;
  const handleChange = (rating) => {
    rating = JSON.stringify({ value: rating });
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: rating,
    })
      .then((resp) => resp.json())
      .then(() => setTimeout(() => isRated(rating), 2000));
  };
  return (
    <div className="set-rating">
      <Rate allowHalf defaultValue={0} onChange={handleChange} count={10} style={{ fontSize: 16 }} />
    </div>
  );
};

export default SetRating;
