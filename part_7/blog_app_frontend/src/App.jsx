import { useState, useEffect, useRef } from 'react'
import { getUsers } from './services/users'

// redux actions
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setBlogs } from './reducers/blogsReducer'
import { removeUser, initializeUser } from './reducers/userReducer'

// components
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

// react router
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import Blog from './components/Blog'
import Navbar from './components/Navbar'
import BasicExample from './components/Navbar'

const App = () => {
  const [users, setUsers] = useState([])

  const displayUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  useEffect(() => {
    displayUsers()
  }, [])

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

  const match = useMatch('/users/:id')
  const viewUser = match
    ? users.find((user) => user.id === match.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div className='container'>
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
          <div>
            {/* <Navbar /> */}
            <BasicExample />
            {user.name} logged-in {logout()}
          </div>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Togglable buttonLabel='new blog' ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                  <button onClick={() => sortBlogs()}>Sort By Likes</button>
                  <BlogList />
                </>
              }
            />
            <Route path='/blogs' element={<BlogList />} />
            <Route path='/blogs/:id' element={<Blog blog={blog} />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User user={viewUser} />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
