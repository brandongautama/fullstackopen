import { useState, useEffect, createRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import blogService from './services/blogs';
import loginService from './services/login';
import storage from './services/storage';
import Login from './components/Login';
import Blog from './components/Blog';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs, setBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const blogs = useSelector(store => store.blogs);
  // const [user, setUser] = useState(null);
  const user = useSelector(store => store.user);
  // const [notification, setNotification] = useState(null);
  const notification = useSelector(store => store.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(initializeBlogs(blogs)));
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  const blogFormRef = createRef();

  const notify = (message, type = 'success') => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      storage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify('Wrong credentials', 'error');
    }
  };

  const handleCreate = async blog => {
    const newBlog = await blogService.create(blog);
    dispatch(setBlogs(blogs.concat(newBlog)));
    notify(`Blog created: ${newBlog.title}, ${newBlog.author}`);
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async blog => {
    // console.log('updating', blog);
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });

    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`);
    dispatch(setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b))));
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  const handleDelete = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      dispatch(setBlogs(blogs.filter(b => b.id !== blog.id)));
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {[...blogs].sort(byLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
