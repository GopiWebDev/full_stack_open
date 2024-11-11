const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) response.json(blog)
  else response.status(404).end
})

blogRouter.post(
  '/',
  middleware.authenticateToken,
  async (request, response, next) => {
    try {
      const body = request.body

      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
      const user = await User.findById(decodedToken.id)

      if (!body.title || !body.url) {
        return response.status(400).end()
      }

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
      })

      const savedBlog = await blog.save()
      const populatedBlog = await savedBlog.populate('user', {
        username: 1,
        name: 1,
      })

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(populatedBlog)
    } catch (error) {
      next(error)
    }
  }
)

blogRouter.delete(
  '/:id',
  middleware.authenticateToken,
  async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id).populate('user')

      if (blog.user.id.toString() !== request.user.id) {
        return response
          .status(403)
          .json({ error: 'You do not have permission to delete this blog' })
      }

      await Blog.deleteOne({ _id: blog._id })
      response.status(204).end()
    } catch (error) {
      next(error)
    }
  }
)

blogRouter.put(
  '/:id',
  middleware.authenticateToken,
  async (request, response) => {
    const { likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true }
    )

    if (!updatedBlog) response.status(404).end()

    response.json(updatedBlog)
  }
)

module.exports = blogRouter
