import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Title from 'antd/es/typography/Title';
import { HeartOutlined } from '@ant-design/icons';
import PostsHandler from '../posts-handler';
import './open-post.css';

const OpenPost = () => {
  const handler = new PostsHandler();
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState('');
  useEffect(() => {
    handler.getPost(id).then((res) => {
      const post = res.article;
      setPostInfo(handler.getPostInfo(post));
    });
  }, []);
  const { title, likes, tags, author, date, body, authorImage } = postInfo;
  const titleStyle = { margin: '0', textAlign: 'end' };
  const tagsList = handler.getTags(tags);
  return (
    <article className="open-post">
      <div className="open-post_info">
        <div className="post_title-block">
          <Title level={4} style={titleStyle}>
            <a>{title}</a>
          </Title>
          <HeartOutlined />
          <span className="post_likes">{likes}</span>
        </div>
        <div className="post_tags">{tagsList}</div>
        <div className="open-post_description">{}</div>
      </div>
      <div className="post_author author">
        <div className="author_description">
          <Title level={5} style={titleStyle}>
            {author}
          </Title>
          <span className="post_date">{date}</span>
        </div>
        <img src={authorImage} alt="avatar icon" className="author_avatar" />
      </div>
      <p className="open-post_text">
        <Markdown>{body}</Markdown>
      </p>
    </article>
  );
};

OpenPost.propTypes = {
  match: PropTypes.object,
};

export default OpenPost;
