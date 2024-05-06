const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  if (!('likes' in blog)) {
    blog.likes = 0;
  }

  const savedBlog = blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
