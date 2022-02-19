import React from 'react';
import './card-image.css';

const CardImage = ({ imageUrl }) => {
  const url = 'https://image.tmdb.org/t/p/original' + imageUrl;
  return <img src={url} alt="pic" className="image" />;
};

export default CardImage;
