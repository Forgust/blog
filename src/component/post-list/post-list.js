/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PostsHandler from '../posts-handler';
import PaginationBlock from '../pagination-block';
import Loader from '../loader/loader';
import './post-list.css';

const PostList = () => {
  const blogApi = new PostsHandler();

  const [posts, setData] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const [getError, setGetError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function dataHandler(res) {
    console.log(res);
    setData(res.articles);
    setPostsCount(res.articlesCount);
    setGetError(false);
    setLoading(false);
  }
  function dataHandlerError(err) {
    console.error(err);
    setGetError(true);
    setLoading(false);
  }

  function nextPage(e) {
    setCurrentPage(e);
    blogApi
      .getPosts(e)
      .then((res) => {
        dataHandler(res);
      })
      .catch((err) => {
        dataHandlerError(err);
      });
  }

  useEffect(() => {
    setLoading(true);
    blogApi
      .getPosts()
      .then((res) => {
        dataHandler(res);
      })
      .catch((err) => {
        dataHandlerError(err);
      });
  }, []);

  const postHandler = new PostsHandler();
  const postList = postHandler.getList(posts);

  if (getError) {
    return <getError></getError>;
  }

  return (
    <div className="post-list">
      {loading ? <Loader /> : null}
      {postList}
      <PaginationBlock postsCount={postsCount} currentPage={currentPage} nextPage={nextPage} />
    </div>
  );
};

export default PostList;

/*eslint-enable*/
