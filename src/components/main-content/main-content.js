import React from 'react';
import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import './main-content.css';

import CardList from '../card-list/card-list';

const MainContent = ({ movies }) => {
  const { Content } = Layout;
  return (
    <Content className="main-content">
      <CardList movies={movies} />
    </Content>
  );
};

export default MainContent;
