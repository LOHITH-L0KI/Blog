import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useConfig } from './ConfigContext';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const config = useConfig(); // Access the configuration using the custom hook

  // Check for stored token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
      // You could decode the token to get user info, but for simplicity we'll assume it's valid
    }
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(config.topicsUrl);
      setTopics(response.data);
    } catch (err) {
      console.error('Error fetching topics:', err);
      setTopics(['OS', 'Multithreading', 'Linux', 'Networking', 'Databases', 'Other']);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(config.postsUrl);
      setBlogs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blogs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchBlogs();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(config.loginUrl, { username, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setIsLoggedIn(true);
      setUser(user);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: err.response?.data?.error || 'Login failed' };
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(config.logoutUrl);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleCreate = async (newBlog) => {
    try {
      const response = await axios.post(config.postsUrl, newBlog);
      setBlogs([...blogs, response.data]);
    } catch (err) {
      setError('Failed to create blog');
      console.error(err);
    }
  };

  const handleUpdate = async (id, updatedBlog) => {
    try {
      const response = await axios.put(`${config.postsUrl}/${id}`, updatedBlog);
      setBlogs(blogs.map(blog => blog.id === id ? response.data : blog));
    } catch (err) {
      setError('Failed to update blog');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.postsUrl}/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (err) {
      setError('Failed to delete blog');
      console.error(err);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header 
          isLoggedIn={isLoggedIn} 
          user={user} 
          onLogin={handleLogin} 
          onLogout={handleLogout} 
        />
        {error && <div className="error-message">{error}</div>}
        <div className="content-layout">
          <Sidebar
            topics={topics}
            selectedTopicId={selectedTopicId}
            onTopicSelect={setSelectedTopicId}
            onTopicsChange={setTopics}
            isLoggedIn={isLoggedIn}
          />
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={<BlogList blogs={blogs} loading={loading} selectedTopicId={selectedTopicId} onCreate={handleCreate} topics={topics} isLoggedIn={isLoggedIn} />} 
              />
              <Route 
                path="/blog/:id" 
                element={<BlogDetail blogs={blogs} onDelete={handleDelete} isLoggedIn={isLoggedIn} />} 
              />
              <Route 
                path="/create" 
                element={<CreateBlog onCreate={handleCreate} topics={topics} />} 
              />
              <Route 
                path="/edit/:id" 
                element={<EditBlog blogs={blogs} onUpdate={handleUpdate} topics={topics} />} 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
