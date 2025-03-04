import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationBlock from '../pagination-block';
import Loader from '../loader/loader';
import GetPostsError from '../error/get-error/get-error';
import { getPosts } from '../../redux/actions';
import DataHandler from '../data-handler';

import './post-list.css';

const PostList = () => {
  const handler = new DataHandler();
  const dispatch = useDispatch();
  const { articles, loading, error, currentPage } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, []);
  let posts = handler.getList(articles);
  useEffect(() => {
    posts = handler.getList(articles);
  }, [articles]);

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
