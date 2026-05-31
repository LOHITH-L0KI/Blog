# Quick Start Guide - Programming Blog

## Prerequisites
- Node.js installed
- npm package manager

## Installation & Running

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Start the Backend Server
Open a terminal and run:
```bash
cd backend
npm start
```
The API server will run on http://localhost:5000

### Step 4: Start the Frontend Application
Open a new terminal and run:
```bash
cd frontend
npm start
```
The React app will automatically open at http://localhost:3000

## Your Blog is Ready! 🎉

You now have a fully functional blog website where you can:
- ✍️ Write blog posts about programming concepts
- 🏷️ Organize posts by topic (OS, Multithreading, Linux, Networking, Databases)
- 🔍 Search and filter posts
- ✏️ Edit existing posts
- 🗑️ Delete posts

## Features

### Create a New Post
1. Click "+ New Post" button in the navigation
2. Enter title, select topic, write content
3. Click "Publish Post"

### View a Post
1. Click on any post from the home page
2. Read the full content
3. You can edit or delete from the detail view

### Search Posts
1. Use the search bar to find posts by keyword
2. Use topic buttons to filter by category
3. Results update in real-time

## File Structure

```
Blog/
├── backend/
│   ├── server.js      - Main server file
│   ├── routes.js      - API endpoints
│   ├── database.js    - Data storage
│   └── data/          - Blog data (JSON)
├── frontend/
│   ├── src/
│   │   ├── components/ - React components
│   │   ├── App.js
│   │   └── index.js
│   └── public/
└── README.md
```

## Troubleshooting

**Port 3000 already in use?**
- The React app will prompt you to run on a different port. Just press 'Y'

**Port 5000 already in use?**
- Edit `backend/server.js` and change `PORT` to another value (e.g., 5001)
- Then update the API URL in `frontend/src/App.js`

**Can't see frontend connect to backend?**
- Make sure both servers are running
- Check that frontend is on port 3000 and backend is on port 5000

**Lost your posts?**
- All posts are saved in `backend/data/blog.json`
- Don't delete this file!

## Next Steps

1. Start writing! 📝
2. Explore the features
3. Customize the styling by editing CSS files in `frontend/src/components/`
4. For production: Consider upgrading to a proper database like SQLite or PostgreSQL

## Tips for Writing Great Blog Posts

- **Title**: Make it clear and descriptive
- **Topic**: Choose the most relevant category
- **Content**: Use proper formatting and line breaks
- **Examples**: Include code examples when explaining concepts
- **Clarity**: Write in a way that others can understand

Happy Blogging! ✨
