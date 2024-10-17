"use client"
import React, { useEffect, useState, useRef, useCallback } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // For loading state
  const observer = useRef();

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${(page - 1) * 10}&_limit=10`);
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts((prevPosts) => [...prevPosts, ...data]); // Append new posts
    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
    } finally {     
      setLoading(false);
    }
  };

  // Observer callback
  const lastPostRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="min-h-[500px] bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Posts</h1>
      {error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={post.id}
              ref={index === posts.length - 1 ? lastPostRef : null} // Set ref to the last post
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))}
        </div>
      )}
      {loading && <p className="text-center">Loading more posts...</p>}
    </div>
  );
};

export default Home;