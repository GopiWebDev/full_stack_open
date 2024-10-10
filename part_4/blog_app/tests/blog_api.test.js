const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const helper = require('./test_helper.test')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = await helper.initalBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned in json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogIds = response.body.map((blog) => blog.id)
  blogIds.forEach((id) => {
    assert(id !== 'undefined')
  })

  response.body.forEach((blog) => {
    assert.strictEqual(blog._id, undefined)
  })
})

test('creating a new blog is successfull', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Me',
    url: 'nothing',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  assert(titles.includes('New Blog'))
})

test('if the likes property is missing from the request', async () => {
  const newBlog = {
    title: 'Blog2',
    author: 'Me2',
    url: 'nothing2',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length + 1)

  blogsAtEnd.map((blog) => {
    blog.likes ? assert(blog.likes) : assert(blog.likes === 0)
  })
})

test('if the title or url properties are missing', async () => {
  const newBlog = {
    author: 'Me3',
    url: 'nothing3',
    likes: 12,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length)
})

after(async () => {
  mongoose.connection.close()
})
