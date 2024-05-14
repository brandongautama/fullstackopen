import { useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN } from '../queries';

// username: "graphuser"
// password: "secret"
const LoginForm = ({ show, setError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    setToken(null);
  };

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem('login-token', token);
      setToken(token);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  const submit = async event => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  const logoutForm = (
    <div>
      loggedin <button onClick={logout}>logout</button>
    </div>
  );

  const loginForm = (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );

  return token ? logoutForm : loginForm;
};

export default LoginForm;
