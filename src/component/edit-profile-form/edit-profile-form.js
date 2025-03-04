import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../../redux/actions';
import DataHandler from '../data-handler';
import { SignUpError } from '../error/registration-error';

import './edit-profile-form.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logged, user, serviceErrors } = useSelector((state) => state.data);
  const { register, handleSubmit, formState, clearErrors, setError } = useForm({ mode: 'onChange' });
  const handler = new DataHandler();
  const onSubmit = (data) => {
    dispatch(editProfile(data));
  };

  const errors = formState.errors;
  const usernameError = errors['username']?.message;
  const emailError = errors['email']?.message;
  const passError = errors['password']?.message;
  const urlError = errors['url']?.message;

  useEffect(() => {
    if (!logged) {
      navigate('/');
    }
  }, [logged]);

  useEffect(() => {
    clearErrors();
    handler.setNewErrors(serviceErrors, (field, error) => setError(field, error));
    return () => {
      clearErrors();
    };
  }, [serviceErrors]);

  return (
    <article className="edit-profile">
      <form onSubmit={handleSubmit(onSubmit)} className="edit-profile_form">
        <Title level={4} style={{ margin: 0, alignSelf: 'center' }}>
          Edit Profile
        </Title>
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input
            className={usernameError ? 'error-border' : ''}
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={user.username}
            {...register('username', {
              required: 'this field is required',
              minLength: { value: 3, message: 'must be longer than 3 characters' },
              maxLength: { value: 20, message: 'It"s very big' },
            })}
          />
          <SignUpError error={usernameError} />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email address</label>
          <input
            className={emailError ? 'error-border' : ''}
            type="email"
            id="email"
            defaultValue={user.email}
            placeholder="Email address"
            {...register('email', {
              required: 'this field is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
                massage: 'invalid email',
              },
            })}
          />
          <SignUpError error={emailError} />
        </div>
        <div className="form-item">
          <label htmlFor="password">New password</label>
          <input
            className={passError ? 'error-border' : ''}
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'this field is required',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, massage: 'It"s very big' },
            })}
          />
          <SignUpError error={passError} />
        </div>
        <div className="form-item">
          <label htmlFor="avatar-url">Avatar image (url)</label>
          <input
            type="text"
            id="avatar-url"
            placeholder="Avatar image"
            defaultValue={user.image}
            {...register('image', {
              required: 'this field is required',
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                message: 'invalid url',
              },
            })}
          />
          <SignUpError error={urlError} />
        </div>
        <div className="form-item">
          <Button type="primary" htmlType="submit" className="form-button">
            Save
          </Button>
        </div>
      </form>
    </article>
  );
};

export default EditProfile;
