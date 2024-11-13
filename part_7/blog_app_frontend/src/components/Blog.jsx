import { addMessage, clearNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(blog?.comments || [])

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (blog) {
      setComments(blog.comments || [])
    }
  }, [blog])

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

  const postComment = async (id, comment) => {
    await blogService.addComment(id, comment)
    const updatedBlog = await blogService.getBlogById(id)
    setComments(updatedBlog.comments)
  }

  const submitComment = async (e) => {
    e.preventDefault()

    const addedComment = await postComment(blog.id, comment)
    setComments([...comments, addedComment])
    setComment('')
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
      <form onSubmit={submitComment}>
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>Add comment</button>
      </form>
      <div>
        <h3>Comments</h3>
        <ul>
          {comments &&
            comments.map((comment) => {
              return <li key={comment}>{comment}</li>
            })}
        </ul>
      </div>
    </div>
  )
}

export default Blog
