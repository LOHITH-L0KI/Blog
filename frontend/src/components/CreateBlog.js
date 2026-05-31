import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogForm.css';

function CreateBlog({ onCreate, topics }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    topicId: topics.length > 0 ? topics[0].id : '',
    content: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (topics.length > 0 && !formData.topicId) {
      setFormData(prev => ({ ...prev, topicId: topics[0].id }));
    }
  }, [topics]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      await onCreate(formData);
      navigate('/');
    } catch (err) {
      alert('Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-form-container">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog post title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <select
            id="topic"
            name="topicId"
            value={formData.topicId}
            onChange={handleChange}
          >
            {topics.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            rows="15"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
