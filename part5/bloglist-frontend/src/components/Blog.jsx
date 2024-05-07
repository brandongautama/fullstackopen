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
  console.log('updated blog', updatedBlog);
};

const Blog = ({ blog }) => {
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
        </>
      )}
    </div>
  );
};

export default Blog;
