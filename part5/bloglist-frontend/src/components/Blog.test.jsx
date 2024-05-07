import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import BlogForm from './BlogForm';

test('renders title and author only by default', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 100,
  };

  const user = {
    username: 'username',
  };

  const deleteBlog = () => null;
  render(<Blog blog={blog} user={user} deleteBlog={deleteBlog} />);

  const title = screen.getByText('title', { exact: false });
  expect(title).toBeDefined();

  const author = screen.getByText('author', { exact: false });
  expect(author).toBeDefined();

  const url = screen.queryByText('url', { exact: false });
  expect(url).toBeNull();

  const likes = screen.queryByText(100, { exact: false });
  expect(likes).toBeNull();
});

test('renders all info when view button is clicked', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 100,
  };

  //   const mockHandler = vi.fn();

  const user = {
    username: 'username',
  };
  const deleteBlog = () => null;
  render(<Blog blog={blog} user={user} deleteBlog={deleteBlog} />);

  const usereventsetup = userEvent.setup();
  const button = screen.getByText('view');
  await usereventsetup.click(button);
  //   expect(mockHandler.mock.calls).toHaveLength(1);

  const title = screen.getByText('title', { exact: false });
  expect(title).toBeDefined();

  const author = screen.getByText('author', { exact: false });
  expect(author).toBeDefined();

  const url = screen.queryByText('url', { exact: false });
  expect(url).toBeDefined();

  const likes = screen.queryByText(100, { exact: false });
  expect(likes).toBeDefined();
});

test('renders all info when view button is clicked', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 100,
  };

  const mockHandler = vi.fn();

  const user = {
    username: 'username',
  };
  const deleteBlog = () => null;
  render(
    <Blog
      blog={blog}
      user={user}
      deleteBlog={deleteBlog}
      handleLikes={mockHandler}
    />
  );

  const usereventsetup = userEvent.setup();
  const button = screen.getByText('view');
  await usereventsetup.click(button);

  const likesetup = userEvent.setup();
  const likeButton = screen.getByText('like');
  await likesetup.click(likeButton);
  await likesetup.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);

  const title = screen.getByText('title', { exact: false });
  expect(title).toBeDefined();

  const author = screen.getByText('author', { exact: false });
  expect(author).toBeDefined();

  const url = screen.queryByText('url', { exact: false });
  expect(url).toBeDefined();

  const likes = screen.queryByText(100, { exact: false });
  expect(likes).toBeDefined();
});

test('blog form', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(
    <BlogForm
      blogs={[]}
      setBlogs={() => null}
      setNotificationMessage={() => null}
      createBlog={createBlog}
      togglableRef={{}}
    />
  );

  const inputTitle = screen.getByPlaceholderText('title');
  const inputAuthor = screen.getByPlaceholderText('author');
  const inputUrl = screen.getByPlaceholderText('url');
  const sendButton = screen.getByText('create');

  await user.type(inputTitle, 'newTitle');
  await user.type(inputAuthor, 'newAuthor');
  await user.type(inputUrl, 'newUrl');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  console.log(createBlog.mock.calls);
  expect(createBlog.mock.calls[0][0].title).toBe('newTitle');
  expect(createBlog.mock.calls[0][0].author).toBe('newAuthor');
  expect(createBlog.mock.calls[0][0].url).toBe('newUrl');
});
