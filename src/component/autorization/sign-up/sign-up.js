import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import './sign-up.css';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [repPassError, setRepPassError] = useState(false);

  const handleChange = (e) => {
    console.log(e.target);
    let repPassEl = document.getElementById('repeat-password');
    const currentInput = e.target;
    switch (currentInput.id) {
      case 'password':
        setPassword(currentInput.value);
        if (currentInput.value.length < 6) {
          setPasswordError(true);
          currentInput.classList.add('error-border');
        } else {
          setPasswordError(false);
          currentInput.classList.remove('error-border');
        }
        if (currentInput.value === repeatPassword) {
          setRepPassError(false);
          repPassEl.classList.remove('error-border');
        } else {
          setRepPassError(true);
          repPassEl.classList.add('error-border');
        }
        break;
      case 'repeat-password':
        setRepeatPassword(currentInput.value);
        if (currentInput.value !== password) {
          setRepPassError(true);
          repPassEl.classList.add('error-border');
        } else {
          setRepPassError(false);
          repPassEl.classList.remove('error-border');
        }
        break;
      case 'username':
        setUsername(currentInput.value);
        break;
      case 'email':
        setEmail(currentInput.value);
        break;
    }
  };

  return (
    <article className="sign-up">
      <form onChange={handleChange} className="sign-up_form" method="post">
        <Title level={4} style={{ margin: 0, alignSelf: 'center' }}>
          Create new account
        </Title>
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username" value={username} />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Email address" value={email} />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" value={password} required />
          <SignUpError passwordError={passwordError} />
        </div>

        <div className="form-item">
          <label htmlFor="repeat-password">Repeat Password</label>
          <input type="password" id="repeat-password" placeholder="Repeat Password" value={repeatPassword} required />
          <SignUpError repPassError={repPassError} />
        </div>
        <div className="form-item policy">
          <input type="checkbox" id="privacy-policy" />
          <label htmlFor="privacy-policy">I agree to the processing of my personal information</label>
        </div>
        <div className="form-item">
          <Button type="primary" className="form-button">
            Create
          </Button>
        </div>
        <div className="sign-up__info info">
          <p className="info__text">
            Already have an account? <a href="#">Sign In</a>.
          </p>
        </div>
      </form>
    </article>
  );
};

const SignUpError = ({ passwordError, repPassError }) => {
  if (passwordError) {
    return <p className="pass-error">Your password needs to be at least 6 characters.</p>;
  } else if (repPassError) {
    return <p className="pass-error">Passwords must match</p>;
  }
};

SignUpError.propTypes = {
  passwordError: PropTypes.bool,
  repPassError: PropTypes.bool,
};

export default SignUp;
