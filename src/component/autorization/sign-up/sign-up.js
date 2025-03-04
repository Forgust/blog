import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { SignUpError } from '../../error/registration-error';
import DataHandler from '../../data-handler';
import { regNewUser } from '../../../redux/actions';

import './sign-up.css';

const SignUp = () => {
  const handler = new DataHandler();
  const { register, handleSubmit, formState, setError, clearErrors } = useForm({ mode: 'onChange' });
  const { serviceErrors, logged } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handler.setNewErrors(serviceErrors, (field, error) => setError(field, error));
    return () => {
      clearErrors();
    };
  }, [serviceErrors]);

  useEffect(() => {
    if (logged) {
      navigate('/');
    }
  }, [logged]);

  const onSubmit = (data) => {
    dispatch(regNewUser(data));
  };

  const errors = formState.errors;
  const usernameError = errors['username']?.message;
  const emailError = errors['email']?.message;
  const passError = errors['password']?.message;
  const passRepError = errors['repeat-password']?.message;
  const policyError = errors['policy']?.message;

  return (
    <article className="sign-up">
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up_form">
        <Title level={4} style={{ margin: 0, alignSelf: 'center' }}>
          Create new account
        </Title>
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input
            className={usernameError ? 'error-border' : ''}
            type="text"
            id="username"
            placeholder="Username"
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="repeat-password">Repeat Password</label>
          <input
            className={passRepError ? 'error-border' : ''}
            type="password"
            id="repeat-password"
            placeholder="Repeat Password"
            {...register('repeat-password', {
              required: 'this field is required',
              validate: {
                matchPassword: (value, { password }) => value === password || 'Passwords must match',
              },
            })}
          />
          <SignUpError error={passRepError} />
        </div>
        <div className="form-item policy">
          <SignUpError error={policyError} />
          <input
            type="checkbox"
            id="privacy-policy"
            {...register('policy', { required: '*' })}
            className={policyError ? 'required' : ''}
          />
          <label htmlFor="privacy-policy">I agree to the processing of my personal information</label>
        </div>

        <div className="form-item">
          <Button type="primary" className="form-button" htmlType="submit">
            Create
          </Button>
        </div>
        <div className="sign-up__info info">
          <p className="info__text">
            Already have an account? <Link to="/sign-in">Sign In</Link>.
          </p>
        </div>
      </form>
    </article>
  );
};

export { SignUp };
