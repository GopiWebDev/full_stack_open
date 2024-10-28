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
      setErrorMessage(`Failed to update likes`)
    }
  }

  const likeButton = () => (
    <button onClick={() => updateLike(blog)}>like</button>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        {blog.author}
        {viewHide()}
        <div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            {likeButton()}
          </div>
          <div>{blog.user && blog.user.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Blog
