import Cookies from 'js-cookie';
import DataHandler from '../component/data-handler';
import { actionTypes } from './actions';

const {
  LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  CREATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  CLEAR_REDIRECT,
  EDIT_POST_SUCCESS,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  LIKE_POST_SUCCESS,
  REGISTRATION_USER_SUCCESS,
  REGISTRATION_USER_ERROR,
  CLEAR_SERVICE_ERRORS,
} = actionTypes;

const initialDataState = {
  loading: false,
  logged: false,
  loginError: false,
  user: {},
  serviceErrorsLog: {},
  serviceErrorsReg: {},
  articles: [],
  post: {},
  error: false,
  currentPage: 1,
  isMyPost: false,
  redirectTo: '',
};

export const dataReducer = (state = initialDataState, action) => {
  const handler = new DataHandler();
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case CREATE_POST_SUCCESS: {
      return { ...state, redirectTo: '/' };
    }
    case EDIT_POST_SUCCESS: {
      const article = action.payload.article;
      const postInfo = handler.getPostInfo(article);
      let isMyPost = false;
      if (postInfo.author === state.user.username) {
        isMyPost = true;
      }
      return { ...state, post: postInfo, isMyPost: isMyPost, redirectTo: '/', loading: false };
    }
    case GET_POSTS_SUCCESS: {
      const articles = action.payload[0].articles;
      const currentPage = action.payload[1];
      return {
        ...state,
        articles: articles,
        loading: false,
        postsCount: action.payload[0].articlesCount,
        currentPage: currentPage,
        error: false,
      };
    }
    case GET_POSTS_ERROR:
      return { ...state, error: true, loading: false };
    case GET_POST_SUCCESS: {
      const article = action.payload.article;
      const postInfo = handler.getPostInfo(article);
      let isMyPost = false;
      if (postInfo.author === state.user.username) {
        isMyPost = true;
      }
      return { ...state, post: postInfo, isMyPost: isMyPost, loading: false, error: false };
    }
    case GET_POST_ERROR:
      return { ...state, error: true };
    case REGISTRATION_USER_SUCCESS: {
      const currentUser = action.payload.user;
      Cookies.set('token', currentUser.token);
      return { ...state, logged: true, loginError: false, user: currentUser, serviceErrorsReg: {} };
    }
    case REGISTRATION_USER_ERROR: {
      const serviceErrorsReg = action.payload.data;
      return { ...state, logged: false, LoginError: true, serviceErrorsReg: serviceErrorsReg };
    }
    case LOGIN_USER_SUCCESS: {
      const currentUser = action.payload.user;
      Cookies.set('token', currentUser.token);
      return { ...state, logged: true, loginError: false, user: currentUser, serviceErrors: {} };
    }
    case LOGIN_USER_ERROR: {
      const serviceErrorsLog = action.payload.data;
      return { ...state, logged: false, LoginError: true, serviceErrorsLog: serviceErrorsLog };
    }
    case DELETE_POST_SUCCESS: {
      return { ...state, post: {}, redirectTo: '/' };
    }
    case EDIT_USER_SUCCESS: {
      const currentUser = action.payload.user;
      Cookies.set('token', currentUser.token);
      return { ...state, logged: true, loginError: false, user: currentUser, serviceErrors: {} };
    }
    case EDIT_USER_ERROR: {
      const serviceErrors = action.payload.data;
      return { ...state, serviceErrors: serviceErrors };
    }
    case LOGOUT_USER:
      Cookies.remove('token');
      return { ...state, logged: false };
    case CLEAR_REDIRECT: {
      return { ...state, redirectTo: '' };
    }
    case CLEAR_SERVICE_ERRORS: {
      const name = action.payload;
      let newState = { ...state };
      if (name === 'log') {
        newState = { ...state, serviceErrorsLog: {} };
      }
      if (name === 'reg') {
        newState = { ...state, serviceErrorsReg: {} };
      }
      return newState;
    }
    case LIKE_POST_SUCCESS: {
      const newArticle = action.payload.article;
      const articles = state.articles;
      const postInfo = handler.getPostInfo(newArticle);
      const updatedArticles = articles.map((article) => {
        if (article.slug === newArticle.slug) {
          return newArticle;
        } else {
          return article;
        }
      });
      return { ...state, post: postInfo, articles: updatedArticles };
    }
    default:
      return state;
  }
};
