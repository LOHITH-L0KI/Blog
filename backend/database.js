const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, 'data');
const dbPath = path.join(dbDir, 'blog.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database with default data
const initialize = () => {
  if (!fs.existsSync(dbPath)) {
    const initialData = [
      {
        id: 1,
        name: 'OS',
        posts: []
      },
      {
        id: 2,
        name: 'Multithreading',
        posts: []
      },
      {
        id: 3,
        name: 'Linux',
        posts: []
      },
      {
        id: 4,
        name: 'Networking',
        posts: []
      },
      {
        id: 5,
        name: 'Databases',
        posts: []
      },
      {
        id: 6,
        name: 'Other',
        posts: []
      }
    ];
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    console.log('Blog database initialized with topics');
  } else {
    console.log('Connected to blog database');
  }
};

// Read all data
const getAllData = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data) || [];
  } catch (err) {
    console.error('Error reading database:', err);
    return [];
  }
};

// Write all data
const saveAllData = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing database:', err);
    throw err;
  }
};

// Get all topics
const getTopics = () => {
  const data = getAllData();
  return data.map(topic => ({ id: topic.id, name: topic.name, postCount: topic.posts.length }));
};

// Get topic by ID
const getTopicById = (topicId) => {
  const data = getAllData();
  return data.find(t => t.id === parseInt(topicId));
};

// Add new topic
const addTopic = (name) => {
  const data = getAllData();
  const topicExists = data.some(t => t.name.toLowerCase() === name.toLowerCase());
  
  if (topicExists) {
    throw new Error('Topic already exists');
  }

  const newTopic = {
    id: data.length > 0 ? Math.max(...data.map(t => t.id)) + 1 : 1,
    name,
    posts: []
  };
  
  data.push(newTopic);
  saveAllData(data);
  return newTopic;
};

// Remove topic
const removeTopic = (topicId) => {
  const data = getAllData();
  const index = data.findIndex(t => t.id === parseInt(topicId));
  
  if (index === -1) {
    throw new Error('Topic not found');
  }

  data.splice(index, 1);
  saveAllData(data);
  return true;
};

// Get all posts (flattened with topic info)
const getAllPosts = () => {
  const data = getAllData();
  const allPosts = [];
  
  data.forEach(topic => {
    topic.posts.forEach(post => {
      allPosts.push({
        ...post,
        topic: topic.name,
        topicId: topic.id
      });
    });
  });
  
  return allPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

// Get post by ID
const getPostById = (postId) => {
  const data = getAllData();
  
  for (let topic of data) {
    const post = topic.posts.find(p => p.id === parseInt(postId));
    if (post) {
      return { ...post, topic: topic.name, topicId: topic.id };
    }
  }
  
  return null;
};

// Create post in topic
const createPost = (topicId, postData) => {
  const data = getAllData();
  const topic = data.find(t => t.id === parseInt(topicId));
  
  if (!topic) {
    throw new Error('Topic not found');
  }

  const newPost = {
    id: topic.posts.length > 0 ? Math.max(...topic.posts.map(p => p.id)) + 1 : 1,
    title: postData.title,
    content: postData.content,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  topic.posts.push(newPost);
  saveAllData(data);
  
  return { ...newPost, topic: topic.name, topicId: topic.id };
};

// Update post
const updatePost = (postId, postData) => {
  const data = getAllData();
  
  for (let topic of data) {
    const postIndex = topic.posts.findIndex(p => p.id === parseInt(postId));
    if (postIndex !== -1) {
      topic.posts[postIndex] = {
        ...topic.posts[postIndex],
        title: postData.title,
        content: postData.content,
        updated_at: new Date().toISOString()
      };
      saveAllData(data);
      return { ...topic.posts[postIndex], topic: topic.name, topicId: topic.id };
    }
  }
  
  return null;
};

// Delete post
const deletePost = (postId) => {
  const data = getAllData();
  
  for (let topic of data) {
    const postIndex = topic.posts.findIndex(p => p.id === parseInt(postId));
    if (postIndex !== -1) {
      topic.posts.splice(postIndex, 1);
      saveAllData(data);
      return true;
    }
  }
  
  return false;
};

module.exports = {
  initialize,
  getTopics,
  getTopicById,
  addTopic,
  removeTopic,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
