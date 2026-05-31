# Programming Blog Website

A full-stack blog application for writing and sharing your understanding of programming concepts like OS, Multithreading, Linux, and more.

## 🚀 Features

- **Create Posts**: Write detailed blog posts about programming concepts
- **Organize by Topic**: Categorize posts (OS, Multithreading, Linux, Networking, Databases)
- **Search & Filter**: Easily find posts by keyword or topic
- **Edit & Delete**: Manage your blog posts with full CRUD operations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Clean UI**: Modern, user-friendly interface

## 📋 Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js with Express.js
- JSON file-based data storage
- CORS enabled for frontend communication

## 📁 Project Structure

```
Blog/
├── frontend/              # React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/               # Express API server
│   ├── server.js         # Main server file
│   ├── database.js       # SQLite setup
│   ├── routes.js         # API routes
│   ├── data/
│   │   └── blog.db       # SQLite database
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Backend Setup

```bash
cd backend
npm install
npm start
```

The API server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app will open at `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all blog posts |
| GET | `/api/posts/:id` | Get a specific post |
| POST | `/api/posts` | Create a new post |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |

### Request Body (POST/PUT)
```json
{
  "title": "Understanding OS Concepts",
  "content": "Detailed content about OS...",
  "topic": "OS"
}
```

## 💾 Database Schema

### Posts Data Structure
```json
{
  "id": 1,
  "title": "Post Title",
  "content": "Post content here...",
  "topic": "OS",
  "created_at": "2024-01-01T12:00:00.000Z",
  "updated_at": "2024-01-01T12:00:00.000Z"
}
```

Data is stored in `backend/data/blog.json` as a JSON array of posts.

## 🎯 How to Use

1. **Start the blog**: Open http://localhost:3000 in your browser
2. **Create a post**: Click the "+ New Post" button
3. **Fill in details**: Enter title, select topic, write content
4. **Publish**: Click "Publish Post"
5. **Browse posts**: View all posts on the home page
6. **Search & Filter**: Use the search bar and topic buttons to filter posts
7. **Edit post**: Click on a post and select "Edit"
8. **Delete post**: Click on a post and select "Delete"

## 🎨 Topics

- **OS** - Operating Systems concepts
- **Multithreading** - Concurrent programming
- **Linux** - Linux system and commands
- **Networking** - Network programming and protocols
- **Databases** - Database systems and SQL
- **Other** - Miscellaneous topics

## 📝 Development

### Frontend Development
- Components are in `frontend/src/components/`
- Each component has its own CSS file
- React Router handles navigation
- Axios is used for API calls

### Backend Development
- Express routes are in `backend/routes.js`
- Database operations in `backend/database.js`
- SQLite database automatically created on first run

## 🐛 Troubleshooting

**Frontend can't connect to backend?**
- Make sure backend is running on port 5000
- Check CORS is enabled in Express

**Database errors?**
- Delete `backend/data/blog.db` and restart server
- Server will automatically recreate the database

**Port already in use?**
- Change port in `backend/server.js` or `frontend` start command

## 📦 Dependencies

### Frontend
- react@18.2.0
- react-router-dom@6.20.0
- axios@1.6.0

### Backend
- express@4.18.2
- sqlite3@5.1.6
- cors@2.8.5

## 🚀 Future Enhancements

- User authentication and login
- Comments and discussions
- Tags for better organization
- Rich text editor
- Export posts as PDF
- Dark mode
- Analytics

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project!

---

Happy blogging! 📝✨
