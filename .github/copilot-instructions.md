# Blog Website Project Setup

This is a full-stack blog application for writing about programming concepts (OS, Multithreading, Linux, etc.).

## Project Structure
- **frontend**: React application for the blog UI
- **backend**: Express.js API server with SQLite database

## Tech Stack
- Frontend: React 18, React Router, Axios
- Backend: Node.js, Express, SQLite3, CORS
- Database: SQLite

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Runs on http://localhost:3000

### Backend Setup
```bash
cd backend
npm install
npm start
```
Runs on http://localhost:5000

## Features
- Create, read, update, delete blog posts
- Search and filter posts by topic
- Responsive design for all devices
- Rich text support for blog content

## Development
- Use npm start for development mode
- Backend API endpoints: /api/posts (GET, POST, PUT, DELETE)
- Database: SQLite stored in backend/data/blog.db
