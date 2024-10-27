import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog }) => {
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

  const likeButton = () => (
    <button onClick={() => console.log(blog.id)}>like</button>
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
