import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SignUpError } from '../../error/registration-error';
import { loginNewUser, clearServiceErrors } from '../../../redux/actions';

import './sign-in.css';

const SignIn = () => {
  const dispatch = useDispatch();
  const [otherErrors, setOtherErr] = useState('');
  const { logged, serviceErrorsLog } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const { register, handleSubmit, formState, clearErrors } = useForm({ mode: 'onChange' });
  const errors = formState.errors;
  const emailError = errors['email']?.message;
  const passError = errors['password']?.message;
  const onSubmit = (data) => {
    dispatch(loginNewUser(data));
  };
  const saveErrors = useMemo(() => serviceErrorsLog, [serviceErrorsLog]);
  useEffect(() => {
    dispatch(clearServiceErrors('log'));
  }, []);
  useEffect(() => {
    if (logged) {
      navigate('/');
    }
  }, [logged]);

  useEffect(() => {
    if (serviceErrorsLog.errors) {
      setOtherErr('email or password is invalid');
    }
    return () => {
      setOtherErr('');
      clearErrors();
    };
  }, [saveErrors]);

  return (
    <article className="sign-in">
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in_form" method="post">
        <Title level={4} style={{ margin: 0, alignSelf: 'center' }}>
          Sign In
        </Title>
        <div className="form-item">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            {...register('email', {
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'is required',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, massage: 'It"s very big' },
            })}
          />
          <SignUpError error={passError} />
        </div>

        <div className="form-item">
          <SignUpError error={otherErrors} />
          <Button type="primary" htmlType="submit" className="form-button">
            Login
          </Button>
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
