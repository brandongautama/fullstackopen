import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('user', JSON.stringify(user));
      console.log(user);
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    console.log('logging in with', username, password);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    blogService.setToken(null);
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username{' '}
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{' '}
        <input
          type='text'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const logoutButton = () => (
    <div>
      <span>{user.name} logged-in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} className='error' />
      {user === null ? loginForm() : logoutButton()}
      {user !== null && <BlogForm blogs={blogs} setBlogs={setBlogs} />}
      {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
