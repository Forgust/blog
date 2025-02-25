/*eslint-disable*/
import React from 'react';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';

import defaultAvatar from './default_avatar.svg';

import './header.css';

const Header = () => {
  const isLogged = false;
  return (
    <header className="header">
      <Title level={4} style={{ margin: '0' }}>
        <Link className="posts--btn" to="/posts">
          Realworld Blog
        </Link>
      </Title>
      {isLogged ? <HeaderBtnsLogin /> : <HeaderBtnsNoLogin />}
    </header>
  );
};

const HeaderBtnsNoLogin = () => {
  return (
    <div className="header-btns">
      <Button className="sign-in--btn" color="default" variant="text">
        Sign-In
      </Button>
      <Button className="sign-up--btn" color="green" variant="outlined">
        Sign-Up
      </Button>
    </div>
  );
};

const HeaderBtnsLogin = () => {
  const titleStyle = { margin: '0' };
  return (
    <div className="header-btns">
      <Button className="create-article--btn" color="green" variant="outlined">
        Create article
      </Button>
      <div className="post_author author">
        <div className="author_description">
          <Title level={5} style={titleStyle}>
            John Doe
          </Title>
        </div>
        <img src={defaultAvatar} alt="avatar icon" className="author_avatar"></img>
      </div>
      <Button className="log-out--btn" color="black" variant="outlined">
        Log Out
      </Button>
    </div>
  );
};

export default Header;
/*eslint-enable*/
