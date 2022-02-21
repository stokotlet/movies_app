import React from 'react';

import SearchForm from '../search-form/search-form';
import './header.css';

const Header = ({ onSearchMovies }) => {
  return (
    <header className="header">
      <SearchForm onSearchMovies={onSearchMovies} />
    </header>
  );
};

export default Header;
