import blogService from '../services/blogs';

const handleLogout = setUser => {
  console.log('logged out');
  window.localStorage.removeItem('user');
  blogService.setToken(null);
  setUser(null);
};

const LogoutButton = ({ user, setUser }) => (
  <div>
    <span>{user.name} logged-in</span>
    <button onClick={() => handleLogout(setUser)}>logout</button>
  </div>
);

export default LogoutButton;
