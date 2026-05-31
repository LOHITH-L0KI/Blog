import React from 'react';
import TopicsManager from './TopicsManager';
import './Sidebar.css';

function Sidebar({ topics, selectedTopicId, onTopicSelect, onTopicsChange, isLoggedIn }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-topic-label">Topics</div>
      <div className="sidebar-topics">
        {topics.length === 0 ? (
          <div className="sidebar-empty">No topics yet</div>
        ) : (
          topics.map(topic => {
            const topicId = topic.id || topic.name || topic;
            const topicName = topic.name || topic;

            return (
              <button
                type="button"
                key={topicId}
                className={`sidebar-topic sidebar-topic-button ${selectedTopicId === topicId ? 'active' : ''}`}
                onClick={() => onTopicSelect(topicId)}
              >
                {topicName}
              </button>
            );
          })
        )}
      </div>
      {isLoggedIn && <TopicsManager topics={topics} onTopicsChange={onTopicsChange} />}
    </aside>
  );
}

export default Sidebar;
