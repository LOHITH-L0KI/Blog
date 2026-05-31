# Blog Backend

Node.js/Express API for the blog application.

## Setup

```bash
npm install
npm start
```

Server runs on http://localhost:5000

## API Endpoints

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## Database

JSON-based file storage in `data/blog.json`

### Post Schema
```json
{
  "id": 1,
  "title": "Understanding OS Concepts",
  "content": "Detailed content...",
  "topic": "OS",
  "created_at": "2024-01-01T12:00:00.000Z",
  "updated_at": "2024-01-01T12:00:00.000Z"
}
```

