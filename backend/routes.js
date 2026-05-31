const express = require('express');
const db = require('./database');
const auth = require('./auth');

const router = express.Router();

// Auth routes
router.post('/login', auth.login);
router.post('/logout', auth.logout);

// GET all topics
router.get('/topics', (req, res) => {
  try {
    const topics = db.getTopics();
    res.json(topics);
  } catch (err) {
    console.error('Error fetching topics:', err);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});

// GET specific topic with all its posts
router.get('/topics/:id', (req, res) => {
  try {
    const topic = db.getTopicById(req.params.id);
    
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    res.json(topic);
  } catch (err) {
    console.error('Error fetching topic:', err);
    res.status(500).json({ error: 'Failed to fetch topic' });
  }
});

// POST add new topic
router.post('/topics', auth.authenticateToken, (req, res) => {
  const { name } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid topic name' });
  }

  try {
    const newTopic = db.addTopic(name.trim());
    res.status(201).json(newTopic);
  } catch (err) {
    console.error('Error adding topic:', err);
    res.status(500).json({ error: err.message || 'Failed to add topic' });
  }
});

// DELETE topic
router.delete('/topics/:id', auth.authenticateToken, (req, res) => {
  try {
    db.removeTopic(req.params.id);
    res.json({ message: 'Topic deleted successfully' });
  } catch (err) {
    console.error('Error deleting topic:', err);
    res.status(500).json({ error: err.message || 'Failed to delete topic' });
  }
});

// GET all posts (flattened)
router.get('/posts', (req, res) => {
  try {
    const posts = db.getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET single post
router.get('/posts/:id', (req, res) => {
  try {
    const post = db.getPostById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// CREATE new post in a topic
router.post('/posts', auth.authenticateToken, (req, res) => {
  const { title, content, topicId } = req.body;
  
  if (!title || !content || !topicId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newPost = db.createPost(topicId, { title, content });
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: err.message || 'Failed to create post' });
  }
});

// UPDATE post
router.put('/posts/:id', auth.authenticateToken, (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updatedPost = db.updatePost(req.params.id, { title, content });
    
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE post
router.delete('/posts/:id', auth.authenticateToken, (req, res) => {
  try {
    const deleted = db.deletePost(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
