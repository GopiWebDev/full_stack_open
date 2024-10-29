import { useState } from 'react'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <span>{blog.author}</span>
      </div>
      <button data-testid='view' onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>

      {visible && (
        <div style={showWhenVisible}>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>

          <div>
            <span data-testid='likeDiv'>likes: {blog.likes}</span>
            <button data-testid='like' onClick={() => updateLike(blog)}>
              like
            </button>
          </div>

          {blog.user && blog.user.name}
          <button data-testid='delete' onClick={() => deleteBlog(blog)}>
            delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
