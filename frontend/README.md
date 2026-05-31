# Blog Frontend

React application for the blog website.

## Setup

```bash
npm install
npm start
```

App runs on http://localhost:3000

## Features

- View all blog posts
- Filter by topic (OS, Multithreading, Linux, Networking, Databases)
- Search blog posts
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Responsive design for mobile and desktop

## Project Structure

```
src/
├── components/
│   ├── Header.js - Navigation header
│   ├── BlogList.js - List of blog posts with filters
│   ├── BlogDetail.js - Single blog post view
│   ├── CreateBlog.js - Create new post form
│   ├── EditBlog.js - Edit post form
│   └── [CSS files for each component]
├── App.js - Main app component with routing
├── App.css - App styles
├── index.js - React entry point
└── index.css - Global styles
```

## Environment

Make sure the backend API is running on http://localhost:5000

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
