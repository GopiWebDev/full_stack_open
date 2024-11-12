const User = ({ user }) => {
  return (
    <div>
      <h2>{user && user.name}</h2>
      <h3>Added Blogs</h3>
      {user?.blogs.length > 0 ? (
        <ul key={user.id}>
          {user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>
          })}
        </ul>
      ) : (
        <p>This user has no blogs</p>
      )}
    </div>
  )
}

export default User
