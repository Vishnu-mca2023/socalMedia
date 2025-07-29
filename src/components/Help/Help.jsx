import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUserFriends,
  FaUserCog,
  FaLock,
  FaComments,
  FaBell,
  FaWrench,
  FaHeadset,
  FaPhoneAlt,
  FaSearch,
  FaPaperPlane,
  FaImage,
  FaQuestionCircle,
  FaShareAlt,
} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Help = () => {
  const [search, setSearch] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const cards = [
    { icon: <FaUserFriends className="text-2xl text-blue-500" />, title: 'Getting Started', desc: 'Learn how to set up your account and connect with friends.' },
    { icon: <FaUserCog className="text-2xl text-orange-500" />, title: 'Account Settings', desc: 'Manage your profile, privacy preferences, and login credentials.' },
    { icon: <FaComments className="text-2xl text-green-500" />, title: 'Messaging & Chat', desc: 'Understand how to chat, manage conversations and send media.' },
    { icon: <FaBell className="text-2xl text-purple-500" />, title: 'Notifications', desc: 'Control how and when you get notified about activity.' },
    { icon: <FaLock className="text-2xl text-red-500" />, title: 'Privacy & Security', desc: 'Adjust privacy settings and learn how we keep your data safe.' },
    { icon: <FaWrench className="text-2xl text-teal-500" />, title: 'Technical Issues', desc: 'Troubleshoot bugs, errors, and report problems to our team.' },
    { icon: <FaImage className="text-2xl text-pink-500" />, title: 'Media Uploads', desc: 'Learn how to upload and manage photos, videos and stories.' },
    { icon: <FaShareAlt className="text-2xl text-yellow-500" />, title: 'Content Sharing', desc: 'Share posts, reels, and media with your friends or followers.' },
    { icon: <FaQuestionCircle className="text-2xl text-indigo-500" />, title: 'Common Questions', desc: 'Browse answers to frequently asked support questions.' },
  ];

  const faqs = [
    { q: 'How do I reset my password?', a: 'Go to settings > Account > Reset Password and follow the instructions.' },
    { q: 'Why can’t I send messages?', a: 'Ensure the person hasn’t blocked you or your network connection is stable.' },
    { q: 'How do I deactivate my account?', a: 'Visit Settings > Privacy > Deactivate and follow the confirmation steps.' },
  ];

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleFeedbackSubmit = () => {
    toast.success('✅ Thanks for your feedback!');
    setShowFeedback(false);
    setFeedback('');
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <Toaster position="top-center" />

      {/* Header & Search */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          How can we help?
        </motion.h1>
        <motion.div
          className="w-full max-w-md mx-auto relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles, topics, FAQs..."
            className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none dark:bg-gray-800 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          Popular topics: privacy, friends, messaging
        </p>
      </div>

      {/* Help Cards Grid */}
      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {filteredCards.map((card, idx) => (
          <motion.div
            key={idx}
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-3">{card.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        {faqs.map((item, i) => (
          <div key={i} className="mb-4 border-b border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
              className="w-full text-left py-3 font-medium flex justify-between items-center"
            >
              {item.q}
              <span className="text-xl">{expandedFAQ === i ? '−' : '+'}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedFAQ === i ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <p className="text-sm text-gray-700 dark:text-gray-400 pb-3">{item.a}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Support Actions */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12 text-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition flex items-center gap-2"
          onClick={() => toast(' We’ve received your request our team will contact you soon...')}
        >
          <FaHeadset /> Live Chat Support
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition flex items-center gap-2"
          onClick={() => toast(' Calling support...')}
        >
          <FaPhoneAlt /> Call Support
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg transition flex items-center gap-2"
          onClick={() => setShowFeedback(true)}
        >
          <FaPaperPlane /> Give Feedback
        </button>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-white">
              <FaPaperPlane /> Feedback Form
            </h3>
            <textarea
              rows="4"
              className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={() => setShowFeedback(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleFeedbackSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;







