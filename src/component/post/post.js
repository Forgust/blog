import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Title from 'antd/es/typography/Title';
import { HeartOutlined } from '@ant-design/icons';
import PostsHandler from '../data-handler';
import { likePost, clearRedirect } from '../../redux/actions';

import './post.css';

const Post = ({ id, title, tags, description, liked, likes, date, author, authorImage }) => {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(clearRedirect());
  }, []);
  const handler = new PostsHandler();

  const titleStyle = { margin: '0' };
  const tagList = handler.getTags(tags);
  return (
    <article className="post">
      <div className="post_info">
        <div className="post_title-block">
          <Title level={4} style={titleStyle}>
            <Link to={`/articles/${id}`}>{title}</Link>
          </Title>
          <div className="post_likes-container">
            <button
              className={`post_like-btn ${liked ? 'liked' : ''}`}
              icon={<HeartOutlined />}
              disabled={!logged}
              onClick={() => dispatch(likePost(id, liked))}
            />
            <span className="post_likes">{likes}</span>
          </div>
        </div>
        <div className="post_tags">{tagList}</div>
        <div className="post_description">{description}</div>
      </div>
      <div className="post_author author">
        <div className="author_description">
          <Title level={5} style={titleStyle}>
            {author}
          </Title>
          <span className="post_date">{date}</span>
        </div>
        <img
          src={authorImage}
          alt="avatar icon"
          className="author_avatar"
          onError={(e) => handler.onImageError(e)}
        ></img>
      </div>
    </article>
  );
};
Post.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.array,
  description: PropTypes.string,
  liked: PropTypes.bool,
  likes: PropTypes.number,
  date: PropTypes.string,
  author: PropTypes.string,
  authorImage: PropTypes.string,
};

export default Post;
