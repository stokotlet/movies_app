import React from 'react';
import './search-form.css';
import _ from 'lodash';

const SearchForm = ({ onSearchMovies }) => {
  const searchHandler = _.debounce((e) => {
    onSearchMovies(e.target.value);
  }, 300);

  return <input className="search-input" onChange={searchHandler} type="text" placeholder="Type to search" />;
};

export default SearchForm;
