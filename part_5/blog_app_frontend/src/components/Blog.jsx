import { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({ blog, setBlogs, setErrorMessage }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const viewHide = () => (
    <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const updateLike = async (blog) => {
    try {
      // get all the blogs
      let blogs = await blogServices.getAll()
      // select the blog which required to update
      const targetBlog = blogs.find((bl) => bl.id === blog.id)
      // update it
      const updatedBlog = { ...targetBlog, likes: targetBlog.likes + 1 }
      await blogServices.update(updatedBlog)
      // get the new version and set it
      blogs = await blogServices.getAll()
      setBlogs(blogs)
    } catch (error) {
      setErrorMessage('Failed to update likes')
    }
  }

  const deleteBlog = async (blog) => {
    const confirm = window.confirm(`Remove blog ${blog.title}`)
    if (confirm) {
      await blogServices.deleteBlog(blog)
      let blogs = await blogServices.getAll()
      setBlogs(blogs)
    } else return
  }

  const likeButton = () => (
    <button onClick={() => updateLike(blog)}>like</button>
  )

  const deleteButton = () => (
    <button onClick={() => deleteBlog(blog)}>delete</button>
  )

  return (
    <div style={blogStyle} className='blog'>
      {blog.title}
      {blog.author}
      {viewHide()}
      <div style={showWhenVisible} className='toggleable'>
        {blog.url}
        <div>
          {blog.likes}
          {likeButton()}
        </div>
        {blog.user && blog.user.name}
        {deleteButton()}
      </div>
    </div>
  )
}

export default Blog
