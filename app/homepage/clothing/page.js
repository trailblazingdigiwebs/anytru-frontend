'use client'
import React, { useState, useEffect } from 'react';
import Post from './../../components/post';
import Header from './../../components/header';

const ClothingPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/product/list?category=Clothing&isActive=true');
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
      <main className="home-posts">
        {posts.map((post, index) => (
          <Post key={post._id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default ClothingPage;
