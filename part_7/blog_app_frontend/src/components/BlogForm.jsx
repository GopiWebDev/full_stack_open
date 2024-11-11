import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { addMessage, clearNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case 'title':
        setTitle(value)
        break
      case 'author':
        setAuthor(value)
        break
      case 'url':
        setUrl(value)
        break
      default:
        break
    }
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then((response) => {
        dispatch(addBlog(response))
      })
      .then(() => {
        dispatch(
          addMessage({ content: `a new blog ${blogObject.title} added` })
        )
      })
      .catch((error) => {
        console.log(error)

        dispatch(
          addMessage({ content: error.response.data.error, error: true })
        )
      })

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const submitBlog = (e) => {
    e.preventDefault()

    const blogObject = {
      title,
      author,
      url,
    }

    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form action='' onSubmit={submitBlog}>
      <h2>create new</h2>
      <div>
        <label htmlFor='title'>title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor='author'>author:</label>
        <input
          type='text'
          id='author'
          name='author'
          value={author}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor='url'>url:</label>
        <input
          type='url'
          id='url'
          name='url'
          value={url}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm
