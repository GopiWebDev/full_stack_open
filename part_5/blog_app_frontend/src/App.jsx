import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [addMessage, setAddMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

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

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

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

  return (
    <div>
      <Notification message={addMessage} error={false} />
      <Notification message={errorMessage} error={true} />
      {user === null ? (
        <>
          <h2>login to the application</h2>
          <Togglable buttonLabel='login'>
            <LoginForm login={login} />
          </Togglable>
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in {logout()}
          </p>
          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
