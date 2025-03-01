import Cookies from 'js-cookie';
import { RegistrationError } from '../component/error/registration-error/index';

const LOADING = 'LOADING';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';
const LOGIN_USER_SUCCESS = 'LOGIN_CURRENT_USER_SUCCESS';
const LOGIN_USER_ERROR = 'LOGIN_CURRENT_USER_ERROR';
const LOGOUT_USER = 'LOGOUT_USER';

export const getPosts = (page = 1) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      let offSet = 0;
      if (page > 1) {
        offSet = page * 5;
      }
      const res = await fetch(`https://blog-platform.kata.academy/api/articles?offset=${offSet}&&limit=5`);
      if (!res.ok) {
        throw new Error(`error getting url: https://blog-platform.kata.academy/api/articles?page=${page}`);
      }
      const data = await res.json();

      dispatch({ type: GET_POSTS_SUCCESS, payload: [data, page] });
    } catch (error) {
      dispatch({ type: GET_POSTS_ERROR, payload: error });
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`);
      if (!res.ok) {
        throw new Error(`error getting url: https://blog-platform.kata.academy/api/articles/${id}`);
      }
      const jsonRes = await res.json();
      dispatch({ type: GET_POST_SUCCESS, payload: jsonRes });
    } catch (error) {
      dispatch({ type: GET_POST_ERROR, payload: error });
    }
  };
};

export const regNewUser = (body) => {
  return async (dispatch) => {
    try {
      const { username, email, password } = body;
      const newUser = { user: { username: username, email: email, password: password } };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      };
      const res = await fetch('https://blog-platform.kata.academy/api/users', options);

      if (!res.ok) {
        const errorData = await res.json();
        throw new RegistrationError('Post error url: https://blog-platform.kata.academy/api/users', errorData);
      }

      const jsonRes = await res.json();
      dispatch({ type: LOGIN_USER_SUCCESS, payload: jsonRes });
    } catch (errors) {
      dispatch({ type: LOGIN_USER_ERROR, payload: errors });
    }
  };
};

export const loginCurrentUser = (token) => {
  return async (dispatch) => {
    try {
      console.log(token);
      const res = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status !== 200) {
        console.log('ошибка');
        const errorJson = await res.json();
        throw new RegistrationError('error from https://blog-platform.kata.academy/api/user', errorJson);
      }
      const jsonRes = await res.json();
      console.log(res);
      console.log(jsonRes);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: jsonRes });
    } catch (errors) {
      dispatch({ type: LOGIN_USER_ERROR, payload: errors });
    }
  };
};

export const loginNewUser = (body) => {
  return async (dispatch) => {
    try {
      const res = await fetch('https://blog-platform.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { ...body } }),
      });

      if (res.status !== 200) {
        const errorJson = await res.json();
        throw new RegistrationError('error from https://blog-platform.kata.academy/api/user', errorJson);
      }
      const jsonRes = await res.json();
      dispatch({ type: LOGIN_USER_SUCCESS, payload: jsonRes });
    } catch (errors) {
      dispatch({ type: LOGIN_USER_ERROR, payload: errors });
    }
  };
};

export const editProfile = (body) => {
  return async (dispatch) => {
    try {
      const currentToken = Cookies.get('token');

      console.log(body);
      const res = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { ...body } }),
      });
      if (res.status !== 200) {
        const errorJson = await res.json();
        throw new RegistrationError('error from https://blog-platform.kata.academy/api/user', errorJson);
      }
      const jsonRes = await res.json();
      console.log(res);
      console.log(jsonRes);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: jsonRes });
    } catch (errors) {
      dispatch({ type: LOGIN_USER_ERROR, payload: errors });
    }
  };
};

export const logOut = () => ({
  type: LOGOUT_USER,
});

export const actionTypes = {
  LOADING,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
};
