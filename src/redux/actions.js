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
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
const CREATE_POST_ERROR = 'CREATE_POST_ERROR';
const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
const DELETE_POST_ERROR = 'DELETE_POST_ERROR';
const CLEAR_REDIRECT = 'CLEAR_REDIRECT';
const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
const EDIT_POST_ERROR = 'EDIT_POST_ERROR';
const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
const EDIT_USER_ERROR = 'EDIT_USER_ERROR';
const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
const LIKE_POST_ERROR = 'LIKE_POST_ERROR';

export const getPosts = (page = 1) => {
  return async (dispatch) => {
    try {
      const currentToken = Cookies.get('token');
      dispatch({ type: LOADING });
      let offSet = 0;
      if (page > 1) {
        offSet = page * 5;
      }
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      };
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles?offset=${offSet}&&limit=5`,
        currentToken ? options : null
      );
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
      const currentToken = Cookies.get('token');
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      };
      dispatch({ type: LOADING });
      const res = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`, currentToken ? options : null);
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

      dispatch({ type: EDIT_USER_SUCCESS, payload: jsonRes });
    } catch (errors) {
      dispatch({ type: EDIT_USER_ERROR, payload: errors });
    }
  };
};

export const createPost = (data) => {
  return async (dispatch) => {
    try {
      const currentToken = Cookies.get('token');
      const res = await fetch('https://blog-platform.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: { ...data } }),
      });
      if (!res.ok) {
        const errorJson = await res.json();
        throw new RegistrationError('error from https://blog-platform.kata.academy/api/articles', errorJson);
      }
      const jsonRes = await res.json();
      dispatch({ type: CREATE_POST_SUCCESS, payload: jsonRes });
    } catch (err) {
      dispatch({ type: CREATE_POST_ERROR, payload: err });
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const currentToken = Cookies.get('token');
      const res = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      console.log(res);
      if (!res.ok) {
        const errorJson = await res.json();
        throw new RegistrationError('error from https://blog-platform.kata.academy/api/articles', errorJson);
      }

      dispatch({ type: DELETE_POST_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_POST_ERROR, payload: err });
    }
  };
};

export const editPost = (data, id) => {
  return async (dispatch) => {
    try {
      const currentToken = Cookies.get('token');
      const res = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: { ...data } }),
      });
      if (!res.ok) {
        const errorJson = await res.json();
        throw new RegistrationError('error from https://blog-platform.kata.academy/api/articles', errorJson);
      }
      const jsonRes = await res.json();
      dispatch({ type: EDIT_POST_SUCCESS, payload: jsonRes });
    } catch (err) {
      dispatch({ type: EDIT_POST_ERROR, payload: err });
    }
  };
};

export const likePost = (id, liked) => {
  return async (dispatch) => {
    try {
      const currentToken = Cookies.get('token');
      const currentAction = liked ? 'DELETE' : 'POST';
      const res = await fetch(`https://blog-platform.kata.academy/api/articles/${id}/favorite`, {
        method: currentAction,
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorJson = await res.json();
        throw new RegistrationError('error from https://blog-platform.kata.academy/api/articles', errorJson);
      }
      const jsonRes = await res.json();

      dispatch({ type: LIKE_POST_SUCCESS, payload: jsonRes });
    } catch (err) {
      dispatch({ type: LIKE_POST_ERROR, payload: err });
    }
  };
};

export const logOut = () => ({
  type: LOGOUT_USER,
});

export const clearRedirect = () => ({
  type: CLEAR_REDIRECT,
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
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  CLEAR_REDIRECT,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
};
