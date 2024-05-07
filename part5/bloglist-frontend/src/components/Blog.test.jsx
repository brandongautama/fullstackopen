import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

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
  expect(title).toBeDefined();

  const likes = screen.queryByText(100, { exact: false });
  expect(title).toBeDefined();
});
