import React, { Component } from 'react';
import { format } from 'date-fns';
import { Tag } from 'antd';
import { nanoid } from 'nanoid';
import Post from '../post/post';

export default class PostsHandler extends Component {
  url = 'https://blog-platform.kata.academy/api/';
  async getPosts(page = 1) {
    let offSet = 0;
    if (page > 1) {
      offSet = page * 5;
    }
    const res = await fetch(`${this.url}articles?offset=${offSet}&&limit=5`);
    if (!res.ok) {
      throw new Error(`error getting url: ${this.url}articles?page=${page}`);
    }
    const jsonRes = await res.json();

    return jsonRes;
  }

  async getPost(id) {
    const res = await fetch(`${this.url}articles/${id}`);
    if (!res.ok) {
      throw new Error(`error getting url: ${this.url}articles/${id}`);
    }
    const jsonRes = await res.json();
    return jsonRes;
  }

  formateDate(date = new Date()) {
    date = new Date(date);
    return format(date, 'MMMM d, yyyy');
  }
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
  nextPage(e) {
    console.log(e);
  }
}
