import { useEffect, createRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import blogService from '../services/blogs';
import Blog from './Blog';
import NewBlog from './NewBlog';
import Notification from './Notification';
import Togglable from './Togglable';

import { setBlogs } from '../reducers/blogReducer';

const Blogs = ({ notify }) => {
  // const [blogs, setBlogs] = useState([]);
  const blogs = useSelector(store => store.blogs);
  // const [notification, setNotification] = useState(null);
  const notification = useSelector(store => store.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs)));
  }, []);

  const blogFormRef = createRef();
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

  const handleDelete = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      dispatch(setBlogs(blogs.filter(b => b.id !== blog.id)));
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
  };

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />

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

export default Blogs;
