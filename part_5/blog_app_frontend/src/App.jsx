import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [addMessage, setAddMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const logout = () => {
    return (
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedNoteappUser')
          window.location.reload()
        }}
      >
        logout
      </button>
    )
  }

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
      default:
        break
    }
  }

  const addBlog = (e) => {
    e.preventDefault()

    const blogObject = {
      title,
      author,
      url,
    }

    blogService
      .create(blogObject)
      .then((response) => {
        setBlogs(blogs.concat(response))
      })
      .then(() => {
        setAddMessage(`a new blog ${blogObject.title} added`)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
      })

    setTimeout(() => {
      setAddMessage(null)
      setErrorMessage(null)
    }, 5000)
  }

  const blogForm = () => {
    return (
      <form action='' onSubmit={addBlog}>
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

  return (
    <div>
      {/* <h2>blogs</h2> */}
      {/* {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))} */}
      <Notification message={addMessage} error={false} />
      <Notification message={errorMessage} error={true} />
      {user === null ? (
        <>
          <h2>login to the application</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in {logout()}
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          {blogForm()}
        </>
      )}
    </div>
  )
}

export default App
