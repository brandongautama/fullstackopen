import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import Togglable from './components/Togglable';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');
    if (loggedInUser) {
      console.log(`User found ${loggedInUser}`);
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const sortBlogs = () => {
    blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
  };
  sortBlogs();

  const deleteBlog = id => {
    blogService.remove(id);
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
  };

  return (
    <div>
      <h1>blogs</h1>
      <Notification
        message={notificationMessage}
        className={
          notificationMessage && notificationMessage.includes('ERROR')
            ? 'error'
            : 'success'
        }
      />
      {user === null ? (
        <LoginForm
          setUser={setUser}
          setNotificationMessage={setNotificationMessage}
        />
      ) : (
        <LogoutButton user={user} setUser={setUser} />
      )}
      {user !== null && (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setNotificationMessage={setNotificationMessage}
            togglableRef={blogFormRef}
          />
        </Togglable>
      )}
      {user !== null &&
        blogs.map(blog => (
          <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog} />
        ))}
    </div>
  );
};

export default App;
