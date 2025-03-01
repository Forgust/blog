import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DataHandler from '../../data-handler';
import { SignUpError } from '../../error/registration-error';
import { loginNewUser } from '../../../redux/actions';

import './sign-in.css';

const SignIn = () => {
  const handler = new DataHandler();
  const { logged, serviceErrors } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError, clearErrors } = useForm({ mode: 'onChange' });

  const errors = formState.errors;
  const emailError = errors['email']?.message;
  const passError = errors['password']?.message;
  const otherError = errors['other']?.message;
  console.log(otherError);
  console.log(errors);

  const onSignIn = (data) => {
    console.log(data);
    dispatch(loginNewUser(data));
  };

  useEffect(() => {
    if (logged) {
      navigate('/');
    }
  }, [logged]);

  useEffect(() => {
    handler.setNewErrors(serviceErrors, (field, error) => setError(field, error));
    return () => {
      clearErrors();
    };
  }, [serviceErrors]);

  return (
    <article className="sign-in">
      <form onSubmit={handleSubmit(onSignIn)} className="sign-in_form" method="post">
        <Title level={4} style={{ margin: 0, alignSelf: 'center' }}>
          Sign In
        </Title>
        <div className="form-item">
          <label htmlFor="email-in">Email address</label>
          <input
            type="email"
            id="email-in"
            placeholder="Email address"
            {...register('email-in', {
              required: 'is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
                massage: 'invalid email',
              },
            })}
          />
          <SignUpError error={emailError} />
        </div>
        <div className="form-item">
          <label htmlFor="password-in">Password</label>
          <input
            type="password"
            id="password-in"
            placeholder="Password"
            {...register('password-in', {
              required: 'is required',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, massage: 'It"s very big' },
            })}
          />
          <SignUpError error={passError} />
        </div>

        <div className="form-item">
          <Button id="sign-in--btn" type="primary" htmlType="submit" className="form-button">
            Login
          </Button>
          <SignUpError error={otherError} />
        </div>
        <div className="sign-in__info info">
          <p className="info__text">
            Don`t have an account? <Link to="/sign-up">Sign Up</Link>.
          </p>
        </div>
      </form>
    </article>
  );
};

export { SignIn };
