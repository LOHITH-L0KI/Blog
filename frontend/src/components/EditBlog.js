import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from "@tiptap/react";
import {TextStyle, TextStyleKit } from "@tiptap/extension-text-style";
import {FontFamily} from "@tiptap/extension-font-family";
import StarterKit from "@tiptap/starter-kit";
import './BlogForm.css';


function EditBlog({ blogs, onUpdate, topics }) {

  const navigate = useNavigate();
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));
    const editor = useEditor({
  extensions: [
    StarterKit,
    TextStyle,
    TextStyleKit,
    FontFamily.configure({
      types: ['textStyle'],
    }),
  ],
  content: blog?.content || ''
});

  const [formData, setFormData] = useState({
    title: '',
    topicId: topics.length > 0 ? topics[0].id : '',
    content: ''
  });
  const [loading, setLoading] = useState(false);

  const topicsList = topics;

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        topicId: blog.topicId,
        content: blog.content
      });
    }
  }, [blog]);

  if (!blog) {
    return <div className="blog-form-container"><p>Blog post not found.</p></div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      await onUpdate(blog.id, formData);
      navigate(`/blog/${blog.id}`);
    } catch (err) {
      alert('Failed to update blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-form-container">
      <MenuBar editor={editor} /> 
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog post title"
            required
          />
        </div>
        <EditorContent editor={editor} />
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            rows="15"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/blog/${blog.id}`)} 
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function MenuBar({ editor }) {
  const changeFont = (event) => {
    const fontFamily = event.target.value;

    if (fontFamily === "") {
      editor.chain().focus().unsetFontFamily().run();
      return;
    }

    editor.chain().focus().setFontFamily(fontFamily).run();

  };

   const changeTextColor = (event) => {
    const color = event.target.value;

    if (!color) {
      editor.chain().focus().unsetColor().run();
      return;
    }

    editor.chain().focus().setColor(color).run();
  };  

  return (
    <div>
      <select onChange={changeFont} defaultValue="">
        <option value="">Default Font</option>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
      </select>

      <select onChange={changeTextColor} defaultValue="">
        <option value="">Text Color</option>
        <option value="#000000">Black</option>
        <option value="#ff0000">Red</option>
        <option value="#008000">Green</option>
        <option value="#0000ff">Blue</option>
        <option value="#ffa500">Orange</option>
        <option value="#800080">Purple</option>
      </select>

      <button style={{ fontWeight: 'bold' }}
        onClick={() => editor.chain().focus().toggleBold().run()}
        type="button"
      >
        B
      </button>

      <button style={{ fontStyle: 'italic' }}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type="button"
      >
        I
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        type="button"
      >
        H1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        type="button"
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        type="button"
      >
        Bullet List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        type="button"
      >
        Numbered List
      </button>
    </div>
  );
}

export default EditBlog;
