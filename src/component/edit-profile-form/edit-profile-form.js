import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

import './edit-profile-form.css';

const EditProfile = () => {
  return (
    <article className="edit-profile">
      <form className="edit-profile_form">
        <Title level={4} style={{ margin: 0, alignSelf: 'center' }}>
          Edit Profile
        </Title>
        <div className="form-item">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username" value="John Doe" />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Email address" value="john@example.com" />
        </div>
        <div className="form-item">
          <label htmlFor="new-password">New password</label>
          <input type="password" id="new-password" placeholder="New password" />
        </div>
        <div className="form-item">
          <label htmlFor="avatar-url">Avatar image (url)</label>
          <input type="url" id="avatar-url" placeholder="Avatar image" />
        </div>
        <div className="form-item">
          <Button type="primary" className="form-button">
            Save
          </Button>
        </div>
      </form>
    </article>
  );
};

export default EditProfile;
