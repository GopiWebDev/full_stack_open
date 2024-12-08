import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../../queries'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-token', token)
    }
  }, [setToken, result.data])

  const submit = async (e) => {
    e.preventDefault()

    const object = { username, password }
    await login({ variables: object })

    setUsername('')
    setPassword('')

    navigate('/')
  }

  return (
    <form action='' onSubmit={submit}>
      <div>
        <label htmlFor=''>Username</label>
        <input
          type='text'
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor=''>Password</label>
        <input
          type='password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm
