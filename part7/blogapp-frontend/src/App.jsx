import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import loginService from './services/login';
import storage from './services/storage';
import Login from './components/Login';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';
import Blogs from './components/Blogs';
import { setNotification } from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';
import BlogDetails from './components/BlogDetails';

const App = () => {
  // const [user, setUser] = useState(null);
  const user = useSelector(store => store.user);
  // const [notification, setNotification] = useState(null);
  const notification = useSelector(store => store.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

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

  const handleLogout = () => {
    dispatch(setUser(null));
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
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

  return (
    <div className='container'>
      <Router>
        <div>
          <Link to='/'>blogs</Link>
          <Link to='/users'>users</Link>
        </div>

        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>

        <Routes>
          <Route path='/' element={<Blogs notify={notify} />} />
          <Route path='/blogs/:id' element={<BlogDetails notify={notify} />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
