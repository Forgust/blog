/*eslint-disable*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions';
import { Pagination } from 'antd';

import './pagination-block.css';

const PaginationBlock = () => {
  const { postsCount, currentPage } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  return (
    <div className="pagination-block">
      <Pagination
        align="center"
        hideOnSinglePage
        defaultCurrent={currentPage}
        total={postsCount}
        showSizeChanger={false}
        pageSize={5}
        onChange={(e) => dispatch(getPosts(e))}
      />
    </div>
  );
};

export default PaginationBlock;
/*eslint-enable*/
