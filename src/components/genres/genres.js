import React from 'react';
import './genres.css';

const Genres = ({ genreList, genreIds }) => {
  const genres = genreList.filter((genre) => genreIds.includes(genre.id));
  const renderGenres = genres.map((genre) => {
    return (
      <div key={genre.id} className="genres">
        {genre.name}
      </div>
    );
  });
  return <div className="genres-box">{renderGenres}</div>;
};

export default Genres;
