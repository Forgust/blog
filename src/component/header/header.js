import React from 'react';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/actions';
import defaultAvatar from './default_avatar.svg';

import './header.css';

const Header = () => {
  const { logged } = useSelector((state) => state.data);

  return (
    <header className="header">
      <Title level={4} style={{ margin: '0' }}>
        <Link className="posts--btn" to="/">
          Realworld Blog
        </Link>
      </Title>
      {logged ? <HeaderBtnsLogin /> : <HeaderBtnsNoLogin />}
    </header>
  );
};

const HeaderBtnsNoLogin = () => {
  return (
    <div className="header-btns">
      <Link to="/sign-in">
        <Button className="sign-in--btn" color="default" variant="text">
          Sign-In
        </Button>
      </Link>
      <Link to="/sign-up">
        <Button className="sign-up--btn" color="green" variant="outlined">
          Sign-Up
        </Button>
      </Link>
    </div>
  );
};

const HeaderBtnsLogin = () => {
  const { user } = useSelector((state) => state.data);

  const dispatch = useDispatch();
  const titleStyle = { margin: '0' };
  return (
    <div className="header-btns">
      <Link to="/new-article">
        <Button className="create-article--btn" color="green" variant="outlined">
          Create article
        </Button>
      </Link>
      <div className="post_author author">
        <div className="author_description">
          <Link to="/profile" className="username">
            <Title level={5} style={titleStyle}>
              {user.username}
            </Title>
          </Link>
        </div>
        <Link to="/profile" className="author_avatar">
          <img src={user.image ? user.image : defaultAvatar} alt="avatar icon" />
        </Link>
      </div>
      <Button onClick={() => dispatch(logOut())} className="log-out--btn" color="black" variant="outlined">
        Log Out
      </Button>
    </div>
  );
};

export default Header;
