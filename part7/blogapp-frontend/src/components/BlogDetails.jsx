import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';
import { setBlogs } from '../reducers/blogReducer';

const BlogDetails = ({ notify }) => {
  const blogs = useSelector(store => store.blogs);
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find(blog => blog.id === id);

  const handleVote = async blog => {
    // console.log('updating', blog);
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });

    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`);
    dispatch(setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b))));
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        {blog.url} <br />
        {blog.likes} likes{' '}
        <button onClick={() => handleVote(blog)}>like</button> <br />
        added by {blog.author}
      </p>
    </div>
  );
};

export default BlogDetails;
