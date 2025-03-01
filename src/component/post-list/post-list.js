/*eslint-disable*/
import React, { useEffect } from 'react';
import PaginationBlock from '../pagination-block';
import Loader from '../loader/loader';
import GetPostsError from '../error/get-error/get-error';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions';

import './post-list.css';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="post-list">
      {error ? <GetPostsError /> : null}
      {loading ? <Loader /> : null}
      {posts}
      <PaginationBlock />
    </div>
  );
};

export default PostList;

/*eslint-enable*/
