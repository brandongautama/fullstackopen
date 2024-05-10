import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const id = useParams().id;
  const users = useSelector(store => store.users);
  const currentUser = users.find(user => user.id === id);

  if (!currentUser) {
    return null;
  }
  console.log(currentUser);
  return (
    <div>
      <h3>{currentUser.name}</h3>
      <h4>added blogs</h4>
      {currentUser.blogs.map(blog => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
};

export default User;
