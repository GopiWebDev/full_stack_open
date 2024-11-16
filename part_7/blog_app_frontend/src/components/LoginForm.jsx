import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { addMessage, clearNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(
        addMessage({ content: 'Wrong username or password', error: true })
      )
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    await login(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <div className='w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 px-6 py-4'>
      <h3 className='mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200'>
        Welcome Back
      </h3>

      <p className='mt-1 text-center text-gray-500 dark:text-gray-400'>
        Login to your account
      </p>
      <form onSubmit={handleLogin}>
        <div className='w-full mt-4'>
          <input
            className='block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter Your Username'
            aria-label='Username'
            type='text'
            value={username}
            name='Username'
            data-testid='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='w-full mt-4'>
          <input
            className='block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
            type='password'
            placeholder='Enter Your Password'
            aria-label='Password'
            value={password}
            name='Password'
            data-testid='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className='flex items-center justify-between mt-4'>
          <button
            className='px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
            type='submit'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
