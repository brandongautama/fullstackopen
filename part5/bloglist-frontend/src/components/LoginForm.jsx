import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ setUser, setNotificationMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('user', JSON.stringify(user));
      console.log('logged in as', user);
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotificationMessage('Successfully logged in');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage('ERROR: Wrong credentials');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  return (
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
};

export default LoginForm;
