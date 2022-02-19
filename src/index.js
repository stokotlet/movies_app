import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Spin, Alert } from 'antd';

import MainContent from './components/main-content/main-content';
import 'antd/dist/antd.min.css';
import './index.css';

class App extends React.Component {
  state = {
    movies: [],
    loading: true,
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=1cfe74af7757c33f37542e537da984f2&query=way')
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
            errorMessage: 'Nothing found',
          });
          throw new Error();
        }
        this.setState({
          movies: response.results,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  }
  render() {
    const { Header, Footer } = Layout;
    const loadingContent = this.state.loading ? <Spin /> : null;
    const loadedContent = this.state.loading || this.state.error ? null : <MainContent movies={this.state.movies} />;
    const errorMessage = this.state.error ? (
      <Alert message="Oops" description={this.state.errorMessage} type="error" />
    ) : null;
    return (
      <Layout style={{ backgroundColor: '#E5E5E5' }}>
        <Header style={{ backgroundColor: '#E5E5E5', margin: '0 auto', width: '100%' }}>Header</Header>
        {loadingContent}
        {loadedContent}
        {errorMessage}
        <Footer style={{ backgroundColor: '#E5E5E5', margin: '0 auto', width: '100%' }}>Footer</Footer>
      </Layout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
