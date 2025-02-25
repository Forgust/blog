import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Title from 'antd/es/typography/Title';
import { HeartOutlined } from '@ant-design/icons';
import PostsHandler from '../posts-handler';

import defaultAvatar from './post-img/default_avatar.svg';
import './post.css';

const Post = ({ id, title, tags, description, liked, likes, date, author, authorImage }) => {
  const [testLiked, setTestLiked] = useState(liked);
  const handler = new PostsHandler();
  function onLicked() {
    console.log('like');
    setTestLiked(!testLiked);
  }
  function onImageError(e) {
    console.log(e, e.target);
    e.target.src = defaultAvatar;
  }
  const isLogged = true;
  const titleStyle = { margin: '0', textAlign: 'end' };
  const tagList = handler.getTags(tags);
  return (
    <article className="post">
      <div className="post_info">
        <div className="post_title-block">
          <Title level={4} style={titleStyle}>
            <Link to={`/posts/${id}`}>{title}</Link>
          </Title>
          <div className="post_likes-container">
            <button
              className={`post_like-btn ${testLiked ? 'liked' : ''}`}
              icon={<HeartOutlined />}
              disabled={!isLogged}
              onClick={(e) => onLicked(e)}
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
        <img src={authorImage} alt="avatar icon" className="author_avatar" onError={onImageError}></img>
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
