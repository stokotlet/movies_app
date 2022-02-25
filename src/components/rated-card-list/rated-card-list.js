import React from 'react';

import 'antd/dist/antd.min.css';

import RatedCardText from '../rated-card-text/rated-card-text';
import CardImage from '../card-image/card-image';

export default class CardList extends React.Component {
  render() {
    const movies = this.props.movies;
    const movieList = movies.map((movie) => {
      return (
        <div className="card" key={movie.id}>
          <CardImage imageUrl={movie.poster_path} />
          <RatedCardText
            title={movie.title}
            date={movie.release_date}
            overview={movie.overview}
            rating={movie.vote_average}
            userRating={movie.rating}
            genreIds={movie.genre_ids}
          />
        </div>
      );
    });
    return (
      <main className="main-content">
        <div className="list-wrapper">{movieList}</div>
      </main>
    );
  }
}
