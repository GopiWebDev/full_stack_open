import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  const displayUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  useEffect(() => {
    displayUsers()
  }, [])

  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>Authors</th>
            <th>blogs created</th>
          </tr>
          {users &&
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td style={{ backgroundColor: 'lightblue' }}>
                    {user.blogs.length}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
