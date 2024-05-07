import { useState } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';
const BlogForm = ({
  blogs,
  setBlogs,
  setNotificationMessage,
  createBlog,
  togglableRef,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async event => {
    event.preventDefault();
    try {
      const addedBlog = await createBlog({ title, author, url });
      setBlogs([...blogs, addedBlog]);
      togglableRef.current.toggleVisibility();
      setNotificationMessage(`Added ${addedBlog.title} by ${addedBlog.author}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id='title'
            value={title}
            placeholder='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            value={author}
            placeholder='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            value={url}
            placeholder='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit-button' type='submit'>
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
