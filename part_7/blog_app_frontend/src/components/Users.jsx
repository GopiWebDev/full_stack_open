import { useEffect, useState } from 'react'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])

  const baseUrl = '/api/users'

  const getUsers = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
  }

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
                  <td>{user.name}</td>
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
