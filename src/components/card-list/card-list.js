import React from 'react';

import './card-list.css';
import 'antd/dist/antd.min.css';

import CardText from '../card-text/card-text';
import CardImage from '../card-image/card-image';

export default class CardList extends React.Component {
  render() {
    const movies = this.props.movies;
    const movieList = movies.map((movie) => {
      return (
        <div className="card" key={movie.id}>
          <CardImage imageUrl={movie.poster_path} />
          <CardText title={movie.title} date={movie.release_date} overview={movie.overview} />
        </div>
      );
    });
    return <div className="list-wrapper">{movieList}</div>;
  }
}
