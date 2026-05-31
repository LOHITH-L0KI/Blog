import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css';

function BlogList({ blogs, loading, selectedTopicId, onCreate, topics, isLoggedIn }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    topicId: selectedTopicId || (topics.length > 0 ? topics[0].id : ''),
    content: ''
  });
  const [creatingBlog, setCreatingBlog] = useState(false);

  const expandMore = (blogId, contentLength) => {
    setExpandedBlogs(prev => {
      const current = prev[blogId] || 1000;
      const next = Math.min(current + 1000, contentLength);
      return {
        ...prev,
        [blogId]: next
      };
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setCreatingBlog(true);
    try {
      await onCreate(formData);
      setFormData({
        title: '',
        topicId: selectedTopicId || (topics.length > 0 ? topics[0].id : ''),
        content: ''
      });
      setShowCreateForm(false);
    } catch (err) {
      alert('Failed to create blog post');
    } finally {
      setCreatingBlog(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopicId === null || blog.topicId === selectedTopicId;
    return matchesSearch && matchesTopic;
  });

  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  return (
    <div className="blog-list-container">
      <div className="filters">
        <div className="search-and-button">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {isLoggedIn && (
            <button 
              className="new-post-btn"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              + New Post
            </button>
          )}
        </div>
      </div>

      {showCreateForm && isLoggedIn && (
        <div className="create-blog-form-section">
          <form onSubmit={handleCreateSubmit} className="create-blog-form">
            <div className="form-group">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleFormChange}
                placeholder="Write your blog content here..."
                rows="10"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={creatingBlog}>
                {creatingBlog ? 'Creating...' : 'Create'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowCreateForm(false)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {filteredBlogs.length === 0 ? (
        <div className="no-blogs">
          <p>No blog posts found. {searchTerm && 'Try a different search.'}</p>
          {isLoggedIn && (
            <button 
              onClick={() => setShowCreateForm(true)}
              className="create-link"
            >
              Create your first post
            </button>
          )}
        </div>
      ) : (
        <div>
          {filteredBlogs.map(blog => {
            const contentLength = blog.content.length;
            const displayLimit = expandedBlogs[blog.id] || 1000;
            const shouldShowMore = contentLength > displayLimit;

            return (
              <article key={blog.id} className="blog-card">
                <div className="blog-header">
                  <h2 className="blog-title">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h2>
                  <span className="blog-date">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="blog-excerpt">
                  {blog.content.substring(0, displayLimit)}
                  {shouldShowMore && '...'}
                </p>
                <div className="blog-footer">
                  
                  {shouldShowMore ? (
                    <button
                      onClick={() => expandMore(blog.id, contentLength)}
                      className="read-more"
                    >
                      Continue reading...
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BlogList;
