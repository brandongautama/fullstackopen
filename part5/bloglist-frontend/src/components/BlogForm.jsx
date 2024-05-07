import { useState } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';
const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState(null);

  const addBlog = async event => {
    event.preventDefault();
    try {
      const addedBlog = await blogService.create({ title, author, url });
      setBlogs([...blogs, addedBlog]);
      setNotification(`Added ${addedBlog.title} by ${addedBlog.author}`);
      setTimeout(() => {
        setNotification(null);
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
      {notification && (
        <Notification message={notification} className='success' />
      )}
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
