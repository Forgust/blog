import React from 'react';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/actions';
import defaultAvatar from './default_avatar.svg';

import './header.css';

const Header = () => {
  const { logged } = useSelector((state) => state.data);

  return (
    <header className="header">
      <h1 className="header_title">
        <Link className="posts--btn" to="/">
          Realworld Blog
        </Link>
      </h1>
      {logged ? <HeaderBtnsLogin /> : <HeaderBtnsNoLogin />}
    </header>
  );
};

const HeaderBtnsNoLogin = () => {
  const navigate = useNavigate();
  return (
    <div className="header-btns">
      <Button className="sign-in--btn" color="default" variant="text" onClick={() => navigate('/sign-in')}>
        Sign-In
      </Button>

      <Button className="sign-up--btn" color="green" variant="outlined" onClick={() => navigate('/sign-up')}>
        Sign-Up
      </Button>
    </div>
  );
};

const HeaderBtnsLogin = () => {
  const { user } = useSelector((state) => state.data);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const titleStyle = { margin: '0' };
  return (
    <div className="header-btns">
      <Button className="create-article--btn" color="green" variant="outlined" onClick={() => navigate('/new-article')}>
        Create article
      </Button>
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
