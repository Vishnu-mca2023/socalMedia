import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, UserPlus2 } from 'lucide-react';

import CreatePost from '../Posts/CreatePost';
import PostCard from '../Posts/PostCard';

const API_URL = import.meta.env.VITE_API_URL || 'https://backend-api-b0q2.onrender.com/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts/feed`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  const handlePostLiked = (postId, isLiked, likesCount) => {
    setPosts(posts.map((post) =>
      post._id === postId
        ? { ...post, isLiked, likes: Array(likesCount).fill() }
        : post
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 px-4 flex justify-center transition-all duration-300">
      <div className="w-full max-w-2xl">

        

{/* Create Post Section */}
<div className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl shadow-md p-5 mb-8 transition-all duration-300">
  <div className="flex items-center font-semibold mb-4">
    <span className="text-lg mr-2">✍️</span> {/* Writing emoji */}
    <span className="text-lg">Share Your Thoughts</span>
  </div>
  <CreatePost onPostCreated={handlePostCreated} />
</div>


        {/* Posts Section */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-600 dark:text-gray-300">
            <UserPlus2 className="w-12 h-12 mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold">No posts available</h2>
            <p className="text-sm mt-1">Start following users to view posts in your feed.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <PostCard
                  post={post}
                  onDelete={handlePostDeleted}
                  onLike={handlePostLiked}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;
