/*eslint-disable*/
import React from 'react';
import { Pagination } from 'antd';

import './pagination-block.css';

const PaginationBlock = ({ postsCount, nextPage, currentPage }) => {
  return (
    <div className="pagination-block">
      <Pagination
        align="center"
        hideOnSinglePage
        defaultCurrent={currentPage}
        total={postsCount}
        showSizeChanger={false}
        pageSize={5}
        onChange={(e) => nextPage(e)}
      />
    </div>
  );
};

export default PaginationBlock;
/*eslint-enable*/
