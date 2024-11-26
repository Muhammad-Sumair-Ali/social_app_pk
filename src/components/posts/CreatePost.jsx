'use client'
import axios from 'axios';
import { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { title, description, imageUrl };

    try {
      const response = await axios.post(`/api/posts/create` , postData);

      if (response.status === 201) {
        console.log("Post created:", response.data);
      }
    } catch (error) {
      console.error("Error creating post:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image URL (optional):</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
