import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

import './sign-in.css';

const SignIn = () => {
  return (
    <article className="sign-in">
      <form className="sign-in_form">
        <Title level={4} style={{ margin: 0, alignSelf: 'center' }}>
          Sign In
        </Title>
        <div className="form-item">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Email address" />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <div className="form-item">
          <Button type="primary" className="form-button">
            Login
          </Button>
        </div>
        <div className="sign-in__info info">
          <p className="info__text">
            Don`t have an account? <a href="#">Sign Up</a>.
          </p>
        </div>
      </form>
    </article>
  );
};

export default SignIn;
