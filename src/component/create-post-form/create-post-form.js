import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost, editPost } from '../../redux/actions';
import { SignUpError } from '../error/registration-error';

import './create-post-form.css';

const CreatePostForm = ({ isEdit }) => {
  const { logged, post, redirectTo } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!logged) {
      navigate('/sign-in');
    }
  }, [logged]);

  useEffect(() => {
    navigate(redirectTo);
  }, [redirectTo]);

  const getPostInfo = (post) => {
    return { title: post.title, description: post.description, body: post.body, tagList: post.tags };
  };

  const defaultValues = isEdit ? getPostInfo(post) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues: defaultValues });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const titleErr = errors['title']?.message;
  const descriptionErr = errors['description']?.message;
  const textErr = errors['body']?.message;

  const onSubmit = (data) => {
    isEdit ? dispatch(editPost(data, post.slug)) : dispatch(createPost(data));
  };
  return (
    <div className="create-post">
      <h3 className="create-post_title">{isEdit ? 'Edit article' : 'Create new article'}</h3>
      <form className="create-post_form" onSubmit={handleSubmit(onSubmit)}>
        <label className="create-post_item">
          <span className="label_title">Title</span>
          <input type="text" {...register('title', { required: 'is required' })} placeholder="Title" />
          <SignUpError error={titleErr} />
        </label>
        <label className="create-post_item">
          <span className="label_title">Short description</span>
          <input
            type="text"
            {...register('description', { required: 'is required' })}
            placeholder="Short description"
          />
          <SignUpError error={descriptionErr} />
        </label>
        <label className="create-post_item">
          <span className="label_title">Text</span>
          <textarea
            type="text"
            className="create-post_text"
            {...register('body', { required: 'is required' })}
            placeholder="Text"
          />
          <SignUpError error={textErr} />
        </label>
        <ul className="create-post_tags">
          <span className="label_title">Tags</span>
          {fields.map((field, index) => (
            <li key={field.id} className="tag">
              <input type="text" {...register(`tagList.${index}`)} placeholder="Tag" />
              <Button danger onClick={() => remove(index)}>
                DELETE
              </Button>
            </li>
          ))}
          <Button className="add-tag--btn" color="primary" variant="outlined" onClick={() => append()}>
            Add tag
          </Button>
        </ul>
        <Button className="send-btn" type="primary" htmlType="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
CreatePostForm.propTypes = {
  isEdit: PropTypes.bool,
};

export { CreatePostForm };
