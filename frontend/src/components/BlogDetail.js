import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BlogDetail.css';

function BlogDetail({ blogs, onDelete, isLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="blog-detail-container">
        <p>Blog post not found.</p>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(blog.id);
      navigate('/');
    }
  };

  return (
    <div className="blog-detail-container">
      <div className="blog-detail">
        <Link to="/" className="back-link">← Back to Home</Link>
        
        <div className="blog-header">
          <h1>{blog.title}</h1>
          <div className="blog-meta">
            <span className="topic-tag">{blog.topic}</span>
            <span className="date">
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="blog-content">
          {blog.content}
        </div>

        {isLoggedIn && (
          <div className="blog-actions">
            <Link to={`/edit/${blog.id}`} className="btn btn-edit">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-delete">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;
