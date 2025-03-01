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
} = actionTypes;

const initialDataState = {
  loading: false,
  logged: false,
  loginError: false,
  user: {},
  serviceErrors: {},
  posts: [],
  post: {},
  error: false,
  currentPage: 1,
};

export const dataReducer = (state = initialDataState, action) => {
  const handler = new DataHandler();
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POSTS_SUCCESS: {
      const articles = action.payload[0].articles;
      const currentPage = action.payload[1];
      const posts = handler.getList(articles);
      return {
        ...state,
        posts: posts,
        loading: false,
        postsCount: action.payload[0].articlesCount,
        currentPage: currentPage,
      };
    }
    case GET_POSTS_ERROR:
      return { ...state, error: true, loading: false };
    case GET_POST_SUCCESS: {
      const article = action.payload.article;
      const postInfo = handler.getPostInfo(article);
      return { ...state, post: postInfo };
    }
    case GET_POST_ERROR:
      return { ...state, LoginError: true };

    case LOGIN_USER_SUCCESS: {
      const currentUser = action.payload.user;
      Cookies.set('token', currentUser.token);
      return { ...state, logged: true, loginError: false, user: currentUser };
    }
    case LOGIN_USER_ERROR: {
      const serviceErrors = action.payload.data;
      console.log(serviceErrors);
      return { ...state, logged: false, LoginError: true, serviceErrors: serviceErrors };
    }
    case LOGOUT_USER:
      Cookies.remove('token');
      console.log('logout');
      return { ...state, logged: false };
    default:
      return state;
  }
};
