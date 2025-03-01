import PropTypes from 'prop-types';
import React from 'react';

export class RegistrationError extends Error {
  constructor(message, data) {
    super(message);
    this.name = 'CustomError';
    this.data = data;
  }
}

export const SignUpError = ({ error }) => {
  if (error) {
    return <p className="pass-error">{error}</p>;
  }
};

SignUpError.propTypes = {
  error: PropTypes.string,
};
