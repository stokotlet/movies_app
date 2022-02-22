import React from 'react';
import { Layout, Spin, Alert, Tabs } from 'antd';

import Header from '../header/header';
import MainContent from '../main-content/main-content';
import RatedContentList from '../rated-content-list/rated-content-list';

// import Footer from '../footer/footer';
import 'antd/dist/antd.min.css';
import './app.css';

export default class App extends React.Component {
  state = {
    movies: [1, 2],
    ratedMovies: [],
    loading: true,
    error: false,
    errorMessage: '',
    query: 'return',
    paginatorPage: 1,
    nothingFound: false,
    guestId: '',
    num: 1,
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
      loading: true,
    });
  };

  callback(key) {
    console.log(key);
  }

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

    fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=1cfe74af7757c33f37542e537da984f2`)
      .then((resp) => resp.json())
      .then((response) => {
        this.setState({
          guestId: response.guest_session_id,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
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
    if (prevState.guestId !== this.state.guestId) {
      fetch(
        `https://api.themoviedb.org/3/guest_session/${this.state.guestId}/rated/movies?api_key=1cfe74af7757c33f37542e537da984f2`
      )
        .then((resp) => resp.json())
        .then((response) => {
          this.setState({
            ratedMovies: response.results,
          });
          console.log(this.state.guestId);
        });
    }
  }

  render() {
    const { TabPane } = Tabs;
    const loadingContent = this.state.loading ? <Spin /> : null;
    const loadedContent =
      this.state.loading || this.state.error || this.state.nothingFound ? null : (
        <MainContent movies={this.state.movies} currentPage={this.state.paginatorPage} onChange={this.onChange} />
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
        <div className="tabs-wrapper">
          <Tabs defaultActiveKey="1" onChange={this.callback} tabBarStyle={{ width: '145px', margin: '10px auto' }}>
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
      </Layout>
    );
  }
}
