import { useEffect, useState } from 'react'
import { addMessage, clearNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')

  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedInUser(user.username)
    }
  }, [])

  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async (blog) => {
    try {
      // update it
      const updatedBlog = { ...blog, likes: blog.likes + 1 }

      const response = await blogService.update(updatedBlog)
      // get the new version and set it
      dispatch(likeBlog(response))
    } catch (error) {
      console.log(error)

      dispatch(addMessage({ content: 'Failed to update likes', error: true }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    try {
      const confirm = window.confirm(`Remove blog ${blog.title}`)
      if (confirm) {
        await blogService.deleteBlog(blog)
        dispatch(deleteBlog(blog.id))
        dispatch(addMessage({ content: 'removed successfully' }))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      } else return
    } catch (error) {
      dispatch(addMessage({ content: 'failed to remove blog', error: true }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
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
            <button data-testid='like' onClick={() => handleLike(blog)}>
              like
            </button>
          </div>

          {blog.user?.username === loggedInUser && (
            <button data-testid='delete' onClick={() => handleDelete(blog)}>
              delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
