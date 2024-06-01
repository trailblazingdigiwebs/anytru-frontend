'use client'
import React, { useState, useEffect } from 'react';
import Post from './../../components/post';
import Header from './../../components/header';

const AccessoriesPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/product/list?category=Accessories&isActive=true');
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
      { posts.length === 0 ? (
          <div>No posts available at the moment in this category.</div>
        ) : (
          posts.map((post, index) => (
            <Post key={post._id} post={post} />
          ))
        )}
      </main>
    </div>
  );
};

export default AccessoriesPage;
