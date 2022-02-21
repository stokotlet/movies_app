import React from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Pagination } from 'antd';
import './main-content.css';

import CardList from '../card-list/card-list';

const MainContent = ({ movies, currentPage, onChange }) => {
  const { Content } = Layout;
  return (
    <Content className="main-content">
      <CardList movies={movies} />
      <div className="paginator">
        <Pagination size="small" current={currentPage} onChange={onChange} total={50} />
      </div>
    </Content>
  );
};

export default MainContent;
