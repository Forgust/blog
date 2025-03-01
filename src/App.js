/*eslint-disable*/
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { loginCurrentUser } from './redux/actions';

import Header from './component/header';
import PostList from './component/post-list';

import OpenPost from './component/open-post';
import { SignUp } from './component/autorization/sign-up/sign-up';
import { SignIn } from './component/autorization/sign-in/sign-in';
import EditProfile from './component/edit-profile-form/edit-profile-form';
import NotFoundPage from './component/error/not-fount-page/not-found-page';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentToken = Cookies.get('token');
    if (!currentToken) {
      return;
    }
    dispatch(loginCurrentUser(currentToken));
  }, []);
  return (
    <div className="blog">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<OpenPost />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
/*eslint-enable*/
