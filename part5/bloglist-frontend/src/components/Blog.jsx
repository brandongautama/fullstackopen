import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
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
          <p>{blog.likes}</p>
          <p>{blog.user && blog.user.name}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
