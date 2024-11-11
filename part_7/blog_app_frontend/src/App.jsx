import { useEffect, useRef } from 'react'

// redux actions
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setBlogs } from './reducers/blogsReducer'
import { removeUser, initializeUser } from './reducers/userReducer'

// components
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  // fetch blogs, user from backend and set blogs, user
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  // get blogs and user after fetching
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const logout = () => {
    return (
      <button
        onClick={() => {
          dispatch(removeUser())
        }}
      >
        logout
      </button>
    )
  }

  const sortBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Notification />
      {user === null ? (
        <>
          <h2>login to the application</h2>
          <Togglable buttonLabel='login'>
            <LoginForm />
          </Togglable>
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in {logout()}
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <button onClick={() => sortBlogs()}>Sort By Likes</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
