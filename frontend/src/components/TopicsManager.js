import React, { useState } from 'react';
import axios from 'axios';
import './TopicsManager.css';

const API_URL = 'http://localhost:5000/api/topics';

function TopicsManager({ topics, onTopicsChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddTopic = async (e) => {
    e.preventDefault();
    
    if (!newTopic.trim()) {
      setError('Topic cannot be empty');
      return;
    }

    if (topics.some(t => t.name.toLowerCase() === newTopic.trim().toLowerCase())) {
      setError('Topic already exists');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL, { name: newTopic.trim() });
      onTopicsChange(Array.isArray(response.data) ? response.data : [response.data, ...topics]);
      setNewTopic('');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add topic');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTopic = async (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    if (window.confirm(`Remove topic "${topic.name}"?`)) {
      try {
        await axios.delete(`${API_URL}/${topicId}`);
        onTopicsChange(topics.filter(t => t.id !== topicId));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to remove topic');
        console.error(err);
      }
    }
  };

  return (
    <>
      <button 
        className="topics-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Manage Topics"
      >
        ⚙️ Manage Topics
      </button>

      {isOpen && (
        <div className="topics-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="topics-modal" onClick={(e) => e.stopPropagation()}>
            <div className="topics-modal-header">
              <h3>Manage Topics</h3>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTopic} className="topics-form">
              <div className="form-group">
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => {
                    setNewTopic(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter new topic"
                  disabled={loading}
                />
                <button 
                  type="submit"
                  className="btn-add"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Topic'}
                </button>
              </div>
              {error && <div className="error-msg">{error}</div>}
            </form>

            <div className="topics-list">
              <h4>Current Topics ({topics.length})</h4>
              <div className="topics-grid">
                {topics.map(topic => (
                  <div key={topic.id} className="topic-item">
                    <span>{topic.name} ({topic.postCount})</span>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveTopic(topic.id)}
                      title="Remove topic"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopicsManager;
