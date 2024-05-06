const _ = require('lodash');
const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length == 0) return {};
  const favBlog = blogs.reduce((currentMax, blog) =>
    currentMax && currentMax.likes > blog.likes ? currentMax : blog
  );
  return favBlog;
};

const mostBlogs = blogs => {
  const groupedByAuthors = _.groupBy(blogs, 'author');
  const mapped = Object.entries(groupedByAuthors).map((author, items) => {
    return {
      author: author[0],
      blogs: author[1].length,
    };
  });
  return mapped.reduce((currentMax, author) =>
    currentMax && currentMax.blogs > author.blogs ? currentMax : author
  );
};

const mostLikes = blogs => {
  const groupedByAuthors = _.groupBy(blogs, 'author');
  const mapped = Object.entries(groupedByAuthors).map((author, items) => {
    return {
      author: author[0],
      likes: author[1].reduce((sum, item) => sum + item.likes, 0),
    };
  });
  return mapped.reduce((currentMax, author) =>
    currentMax && currentMax.likes > author.likes ? currentMax : author
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
