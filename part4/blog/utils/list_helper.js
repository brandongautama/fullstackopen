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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
