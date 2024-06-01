'use client'
import React, { useState, useEffect } from 'react';
import Post from './../../components/post';
import Header from './../../components/header';

const HomeDecorPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/product/list?category=HomeDecor&isActive=true');
        const data = await response.json();
        setPosts(data.products);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      { posts.length === 0 ? (
          <div className='noPosts'>No posts available at the moment in this category.</div>
        ) : (
      <main className="home-posts">
        {posts.map((post, index) => (
          <Post key={post._id} post={post} />
        ))}
      </main>
        )}
    </div>
  );
};

export default HomeDecorPage;
