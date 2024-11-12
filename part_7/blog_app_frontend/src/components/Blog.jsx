import { addMessage, clearNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

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
        navigate('/')
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

  if (!blog) return <>LOADING</>

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span data-testid='likeDiv'>likes: {blog.likes}</span>
        <button data-testid='like' onClick={() => handleLike(blog)}>
          like
        </button>
      </div>
      <span>added by {blog.author}</span>

      <div>
        {blog?.user?.username === user.username && (
          <button data-testid='delete' onClick={() => handleDelete(blog)}>
            delete
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
