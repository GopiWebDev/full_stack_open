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

after(async () => {
  mongoose.connection.close()
})
