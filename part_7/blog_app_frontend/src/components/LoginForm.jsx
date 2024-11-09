import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    await login(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          data-testid='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          data-testid='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm
