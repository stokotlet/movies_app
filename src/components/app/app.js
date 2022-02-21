import React from 'react';
import { Layout, Spin, Alert } from 'antd';

import Header from '../header/header';
import MainContent from '../main-content/main-content';
// import Footer from '../footer/footer';
import 'antd/dist/antd.min.css';
import './app.css';

export default class App extends React.Component {
  state = {
    movies: [],
    loading: true,
    error: false,
    errorMessage: '',
    query: 'return',
    paginatorPage: 1,
    nothingFound: false,
  };

  onSearchMovies = (searchString) => {
    if (searchString) {
      this.setState({
        query: searchString,
        paginatorPage: 1,
      });
    }
  };

  onChange = (page) => {
    this.setState({
      paginatorPage: page,
      loading: true,
    });
  };

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1cfe74af7757c33f37542e537da984f2&query=${this.state.query}&page=1`
    )
      .then((resp) => {
        if (!resp.ok) {
          this.setState({
            errorMessage: 'Error from server',
          });
          throw new Error();
        }
        return resp.json();
      })
      .then((response) => {
        this.setState({
          movies: response.results,
          loading: false,
          nothingFound: false,
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  }

  componentDidUpdate(prevState) {
    if (prevState.query !== this.state.query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=1cfe74af7757c33f37542e537da984f2&query=${this.state.query}&total_results=2&page=${this.state.paginatorPage}`
      )
        .then((resp) => {
          if (!resp.ok) {
            this.setState({
              errorMessage: 'Error from server',
            });
            throw new Error();
          }
          return resp.json();
        })
        .then((response) => {
          if (response.results.length === 0) {
            this.setState({
              nothingFound: true,
              movies: [],
              loading: false,
            });
          } else {
            this.setState({
              nothingFound: false,
              movies: response.results,
              loading: false,
            });
          }
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false,
          });
        });
    }
  }

  render() {
    const loadingContent = this.state.loading ? <Spin /> : null;
    const loadedContent =
      this.state.loading || this.state.error || this.state.nothingFound ? null : (
        <MainContent movies={this.state.movies} currentPage={this.state.paginatorPage} onChange={this.onChange} />
      );
    const errorMessage = this.state.error ? (
      <Alert message="Oops, its error" description={this.state.errorMessage} type="error" />
    ) : null;
    const nothingFound = this.state.nothingFound ? (
      <Alert
        message="Nothing found"
        description="Please retry your request"
        type="info"
        style={{ width: '1010px', margin: '0 auto' }}
      />
    ) : null;
    return (
      <Layout style={{ backgroundColor: '#E5E5E5' }}>
        <Header onSearchMovies={this.onSearchMovies} />
        {nothingFound}
        {loadingContent}
        {loadedContent}
        {errorMessage}
      </Layout>
    );
  }
}
