import React, { Component } from 'react';
import { format } from 'date-fns';
import { Tag } from 'antd';
import { nanoid } from 'nanoid';
import Post from '../post/post';

import defaultAvatar from '../post/post-img/default_avatar.svg';
export default class DataHandler extends Component {
  getPostInfo(post) {
    return {
      title: post.title,
      tags: post.tagList,
      description: post.description,
      liked: post.favorited,
      likes: post.favoritesCount,
      date: this.formateDate(post.updatedAt),
      author: post.author.username,
      following: post.author.following,
      authorImage: post.author.image,
      slug: post.slug,
      body: post.body,
    };
  }

  getList(posts) {
    const list = posts.map((post) => {
      const postInfo = this.getPostInfo(post);
      return (
        <Post
          id={postInfo.slug}
          key={postInfo.slug}
          title={postInfo.title}
          tags={postInfo.tags}
          description={postInfo.description}
          liked={postInfo.liked}
          likes={postInfo.likes}
          date={postInfo.date}
          author={postInfo.author}
          following={postInfo.following}
          authorImage={postInfo.authorImage}
        />
      );
    });
    return list;
  }

  getTags(tags) {
    if (!tags) {
      return;
    }
    return tags.map((tag) => {
      const id = nanoid();
      return <Tag key={id}>{tag}</Tag>;
    });
  }

  onLiked() {
    console.log('liked');
  }

  formateDate(date = new Date()) {
    date = new Date(date);
    return format(date, 'MMMM d, yyyy');
  }

  setNewErrors = (errorsObj = {}, callBack = () => {}) => {
    const errors = errorsObj.errors;
    for (const field in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, field)) {
        callBack(field, { type: 'manual', message: errors[field] });
      }
    }
  };
  onImageError = (e) => {
    e.target.src = defaultAvatar;
  };
}
