import React from 'react';
import { Layout, Spin, Alert, Tabs } from 'antd';

import CardList from '../card-list/card-list';
import { Provider } from '../genres-context/genres-context';
import Header from '../header/header';
// import MainContent from '../main-content/main-content';
import RatedContentList from '../rated-card-list/rated-card-list';

import 'antd/dist/antd.min.css';
import './app.css';

export default class App extends React.Component {
  state = {
    movies: [],
    ratedMovies: [],
    genres: [],
    loading: true,
    error: false,
    errorMessage: '',
    query: 'way',
    paginatorPage: 1,
    totalPages: 0,
    nothingFound: false,
    guestId: '',
    newRated: false,
  };

  onSearchMovies = (searchString) => {
    if (searchString) {
      this.setState({
        query: searchString,
        num: 2,
      });
    }
  };

  onChange = (page) => {
    this.setState({
      paginatorPage: page,
      loading: false,
    });
  };

  isRated = () => {
    this.setState((state) => {
      let newState = { ...state };
      newState.newRated = !state.newRated;
      return newState;
    });
  };

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=1cfe74af7757c33f37542e537da984f2`)
      .then((resp) => resp.json())
      .then((response) => {
        this.setState({
          guestId: response.guest_session_id,
        });
      });
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=1cfe74af7757c33f37542e537da984f2`)
      .then((resp) => resp.json())
      .then((response) => {
        this.setState({
          genres: response.genres,
        });
      });
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
          totalPages: response.total_pages,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newRated !== this.state.newRated) {
      fetch(
        `https://api.themoviedb.org/3/guest_session/${this.state.guestId}/rated/movies?api_key=1cfe74af7757c33f37542e537da984f2`
      )
        .then((resp) => resp.json())
        .then((response) => {
          this.setState({
            ratedMovies: response.results,
          });
        });
    }
    if (prevState.query !== this.state.query) {
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
              totalPages: response.total_pages,
              loading: false,
              paginatorPage: 1,
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
    if (prevState.paginatorPage !== this.state.paginatorPage) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=1cfe74af7757c33f37542e537da984f2&query=${this.state.query}&page=${this.state.paginatorPage}`
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
    const { TabPane } = Tabs;
    const loadingContent = this.state.loading ? (
      <div className="spin">
        <Spin />
      </div>
    ) : null;
    const loadedContent =
      this.state.loading || this.state.error || this.state.nothingFound ? null : (
        <CardList
          movies={this.state.movies}
          currentPage={this.state.paginatorPage}
          onChange={this.onChange}
          guestId={this.state.guestId}
          isRated={this.isRated}
          totalPages={this.state.totalPages}
        />
      );

    const ratedContent =
      this.state.loading || this.state.error || this.state.nothingFound ? null : (
        <RatedContentList movies={this.state.ratedMovies} />
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
        <Provider value={this.state.genres}>
          <div className="tabs-wrapper">
            <Tabs defaultActiveKey="1" tabBarStyle={{ width: '120px', margin: '10px auto' }}>
              <TabPane tab="Search" key="1">
                <Header onSearchMovies={this.onSearchMovies} />
                {nothingFound}
                {loadingContent}
                {loadedContent}
                {errorMessage}
              </TabPane>
              <TabPane tab="Rated" key="2">
                {nothingFound}
                {loadingContent}
                {ratedContent}
                {errorMessage}
              </TabPane>
            </Tabs>
          </div>
        </Provider>
      </Layout>
    );
  }
}
