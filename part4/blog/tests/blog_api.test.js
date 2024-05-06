const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const assert = require('node:assert');

const api = supertest(app);

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: '663885f67f6ae963f06b77d8',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(blogs[0]);
  await blogObject.save();
  blogObject = new Blog(blogs[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  response.body.forEach(blog => assert('id' in blog));
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, 2);
});

test('a valid blog can be added ', async () => {
  const newBlog = blogs[2];

  const loginToken = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  });

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginToken.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, 3);
});

test('an empty likes blog can be added ', async () => {
  const { likes, ...newBlog } = blogs[2];

  const loginToken = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  });

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginToken.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, 3);

  assert.strictEqual(response.body[2].likes, 0);
});

test('an empty title blog cannot be added ', async () => {
  const { title, ...newBlog } = blogs[2];
  const loginToken = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  });

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginToken.body.token}`)
    .send(newBlog)
    .expect(400);
});

test('an empty url blog cannot be added ', async () => {
  const { url, ...newBlog } = blogs[2];
  const loginToken = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  });

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginToken.body.token}`)
    .send(newBlog)
    .expect(400);
});

test('delete blog', async () => {
  const loginToken = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  });
  const response = await api.get('/api/blogs');
  const blogsAtStart = response.body;
  const blogToDelete = blogsAtStart[0];
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${loginToken.body.token}`)
    .expect(204);
  const blogsAtEnd = await api.get('/api/blogs');
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.length - 1);
});

test('update blog', async () => {
  const loginToken = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  });
  const response = await api.get('/api/blogs');
  const blogsAtStart = response.body;
  const blogToUpdate = blogsAtStart[0];
  blogToUpdate.likes = 100;
  // console.log(blogToUpdate);
  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200);
  assert.strictEqual(updatedBlog.body.likes, 100);
  const blogsAtEnd = await api.get('/api/blogs');
  assert.strictEqual(blogsAtEnd.body.length, 2);
});

after(async () => {
  await mongoose.connection.close();
});
