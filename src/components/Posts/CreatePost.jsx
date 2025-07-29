import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, X, Smile, Paperclip, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const API_URL = import.meta.env.VITE_API_URL || 'https://backend-api-b0q2.onrender.com/api';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { user } = useAuth();
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && media.length === 0) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', content);
      media.forEach((file) => formData.append('media', file));

      const res = await axios.post(`${API_URL}/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onPostCreated(res.data.post);
      setContent('');
      setMedia([]);
      setPreviewURLs([]);
    } catch (err) {
      console.error('Create post error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setMedia(files);
    setPreviewURLs(previews);
  };

  const removeMedia = (index) => {
    const updatedMedia = [...media];
    const updatedPreviews = [...previewURLs];
    updatedMedia.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setMedia(updatedMedia);
    setPreviewURLs(updatedPreviews);
  };

  const isVideo = (file) => file.type && file.type.startsWith('video');

  const addEmoji = (emoji) => {
    setContent((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm max-w-xl mx-auto relative"
    >
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {user?.avatar ? (
            <img
              src={`https://backend-api-b0q2.onrender.com${user.avatar}`}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-semibold text-sm">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}

          <input
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story..."
            disabled={loading}
            className="w-full border-none focus:outline-none text-sm text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
          />
        </div>

        {/* Media Preview */}
        {previewURLs.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {previewURLs.map((url, index) => (
              <div key={index} className="relative rounded-md overflow-hidden">
                {isVideo(media[index]) ? (
                  <video src={url} className="w-full h-28 object-cover" controls />
                ) : (
                  <img src={url} className="w-full h-28 object-cover" alt="preview" />
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                  title="Remove"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 relative">
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
            <Users size={16} />
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="focus:outline-none"
              title="Add emoji"
            >
              <Smile size={16} />
            </button>
            <label htmlFor="media-upload" className="cursor-pointer">
              <Paperclip size={16} />
            </label>
            <input
              id="media-upload"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="hidden"
              disabled={loading}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading || (!content.trim() && media.length === 0)}
            className={`flex items-center gap-2 px-4 py-1.5 border border-blue-500 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium transition ${
              loading || (!content.trim() && media.length === 0)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Posting...
              </>
            ) : (
              'Upload'
            )}
          </motion.button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute z-50 bottom-20 left-4">
            <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default CreatePost;
