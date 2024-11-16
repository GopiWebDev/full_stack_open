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
    <div className='w-full mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 px-6 py-4'>
      <h3 className='mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200'>
        Create new blog
      </h3>
      <form onSubmit={submitBlog}>
        <div>
          <input
            className='block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter Blog Title'
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            className='block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter Author Name'
            type='text'
            id='author'
            name='author'
            value={author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            className='block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter Blog Url'
            type='url'
            id='url'
            name='url'
            value={url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='flex items-center justify-center mt-4'>
          <button
            className='px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
            type='submit'
          >
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
