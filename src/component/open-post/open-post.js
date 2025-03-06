import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Title from 'antd/es/typography/Title';
import { HeartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popconfirm } from 'antd';
import { deletePost, getPost, likePost } from '../../redux/actions';
import Loader from '../loader/loader';
import PostsHandler from '../data-handler';
import GetPostsError from '../error/get-error/get-error';
import './open-post.css';

const OpenPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, user, redirectTo, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getPost(id));
  }, [user]);
  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [redirectTo]);
  return (
    <>
      {loading ? <Loader /> : <OpenPostView />}
      {error ? <GetPostsError /> : null}
    </>
  );
};

const OpenPostView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const handler = new PostsHandler();
  const { post, isMyPost, logged } = useSelector((state) => state.data);
  const { title, liked, likes, tags, author, date, body, authorImage, description } = post;

  const tagsList = handler.getTags(tags);

  return (
    <article className="open-post">
      <div className="open-post_info">
        <div className="post_title-block">
          <Title level={4} style={{ margin: '0', color: 'rgba(24, 144, 255, 1)' }}>
            {title}
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
        <div className="post_tags">{tagsList}</div>
        <div className="open-post_description">{description}</div>
      </div>
      <div className="post_author author">
        <div className="author_description">
          <Title level={5} style={{ margin: '0' }}>
            {author}
          </Title>
          <span className="post_date">{date}</span>
        </div>
        <img src={authorImage} alt="avatar icon" className="author_avatar" />
        {isMyPost ? <PostButtons id={id} /> : null}
      </div>
      <div className="open-post_body">
        <Markdown>{body}</Markdown>
      </div>
    </article>
  );
};

const PostButtons = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirm = () => {
    dispatch(deletePost(id));
  };

  return (
    <div className="post-buttons">
      <Popconfirm
        placement="rightTop"
        title="Delete the task"
        description="Are you sure to delete this article?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button danger className="post-button">
          DELETE
        </Button>
      </Popconfirm>

      <Button color="green" variant="outlined" className="post-button" onClick={() => navigate(`/articles/${id}/edit`)}>
        Edit
      </Button>
    </div>
  );
};

PostButtons.propTypes = {
  id: PropTypes.string,
};

export default OpenPost;
