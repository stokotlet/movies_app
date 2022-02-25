import React from 'react';
import { Pagination } from 'antd';

import './card-list.css';
import 'antd/dist/antd.min.css';

import CardText from '../card-text/card-text';
import CardImage from '../card-image/card-image';

export default class CardList extends React.Component {
  render() {
    const { movies, guestId, isRated, currentPage, onChange } = this.props;
    const movieList = movies.map((movie) => {
      return (
        <div className="card" key={movie.id}>
          <CardImage imageUrl={movie.poster_path} />
          <CardText
            title={movie.title}
            date={movie.release_date}
            overview={movie.overview}
            rating={movie.vote_average}
            movieId={movie.id}
            guestId={guestId}
            isRated={isRated}
            genreIds={movie.genre_ids}
          />
        </div>
      );
    });
    return (
      <main className="main-content">
        <div className="list-wrapper">{movieList}</div>
        <div className="paginator">
          <Pagination size="small" current={currentPage} onChange={onChange} total={50} />
        </div>
      </main>
    );
  }
}
