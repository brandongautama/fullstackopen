import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className='error'>{message}</div>;
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log(user);
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : <p>{user.name} logged-in</p>}
      {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
