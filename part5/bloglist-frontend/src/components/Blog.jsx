import { useState } from 'react';
import blogService from '../services/blogs';

const handleLikes = async (blog, likes, setLikes) => {
  const updatedBlog = await blogService.update(blog.id, {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: likes + 1,
  });
  setLikes(updatedBlog.likes);
  blog.likes = updatedBlog.likes;
  console.log('updated blog', updatedBlog);
  console.log(blog.user);
};

const Blog = ({ blog, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  return (
    <div className='blog'>
      <p>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {' '}
          {showDetails ? 'hide' : 'view'}{' '}
        </button>
      </p>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>
            {likes}{' '}
            <button onClick={() => handleLikes(blog, likes, setLikes)}>
              like
            </button>
          </p>
          <p>{blog.user && blog.user.name}</p>
          {blog.user && blog.user.username === user.username && (
            <button onClick={() => deleteBlog(blog.id)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
