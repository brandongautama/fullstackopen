import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';
import { setBlogs } from '../reducers/blogReducer';
import { useState } from 'react';

const BlogDetails = ({ notify }) => {
  const [inputComment, setInputComment] = useState('');
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

  const handleSubmitComment = async event => {
    event.preventDefault();
    const response = await blogService.addComment(id, inputComment);
    setInputComment('');
    const updatedBlogs = blogs.map(c => (c.id !== blog.id ? c : response));
    console.log(updatedBlogs);
    dispatch(setBlogs(updatedBlogs));
  };
  console.log(blog);
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        {blog.url} <br />
        {blog.likes} likes{' '}
        <button onClick={() => handleVote(blog)}>like</button> <br />
        added by {blog.author}
      </p>
      <h4>comments</h4>
      <form onSubmit={handleSubmitComment}>
        <input
          type='text'
          value={inputComment}
          onChange={event => setInputComment(event.target.value)}
        ></input>
        <button type='submit'>add comment</button>
      </form>
      {blog.comments &&
        blog.comments.map(comment => {
          return <li key={comment}>{comment}</li>;
        })}
    </div>
  );
};

export default BlogDetails;
