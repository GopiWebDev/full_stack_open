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
  let loggedInUser = ''

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
        blogService.getAll().then((blogs) => setBlogs(blogs))
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
      })

    setTimeout(() => {
      setAddMessage(null)
      setErrorMessage(null)
    }, 5000)
  }

  const updateLike = async (blog) => {
    try {
      // get all the blogs
      let blogs = await blogService.getAll()
      // select the blog which required to update
      const targetBlog = blogs.find((bl) => bl.id === blog.id)
      // update it
      const updatedBlog = { ...targetBlog, likes: targetBlog.likes + 1 }
      await blogService.update(updatedBlog)
      // get the new version and set it
      blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      setErrorMessage('Failed to update likes')
    }
  }

  const deleteBlog = async (blog) => {
    const confirm = window.confirm(`Remove blog ${blog.title}`)
    if (confirm) {
      await blogService.deleteBlog(blog)
      let blogs = await blogService.getAll()
      setBlogs(blogs)
    } else return
  }

  const sortBlogs = () => {
    setBlogs((prevBlogs) => {
      const sortedBlogs = [...prevBlogs].sort((a, b) => b.likes - a.likes)
      return sortedBlogs
    })
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
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <button onClick={() => sortBlogs()}>Sort By Likes</button>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLike={updateLike}
              deleteBlog={deleteBlog}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
