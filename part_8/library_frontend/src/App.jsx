import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './components/Home'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import './index.css'
import Recommended from './components/Recommended'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-token')
    if (token) setToken(token)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const Nav = () => {
    return (
      <div>
        <Link to='/'>
          <button>Home</button>
        </Link>
        <Link to='/authors'>
          <button>authors</button>
        </Link>
        <Link to='/books'>
          <button>books</button>
        </Link>

        {token ? (
          <>
            <Link to='/add'>
              <button>add book</button>
            </Link>
            <Link to='recommended'>
              <button>recommended</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to='/login'>
            <button>login</button>
          </Link>
        )}
      </div>
    )
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <Nav />
      <Routes>
        <Route path='/' element={<Home token={token} />} />
        <Route path='/authors' element={<Authors token={token} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook setError={notify} />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='recommended' element={<Recommended setError={notify} />} />
      </Routes>
    </>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default App
