import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-red-200 flex py-5'>
      <h2 className='w-[25%] mx-5 text-[1.25rem]'>BlogView</h2>
      <div className='w-[80%] flex justify-around items-center'>
        <Link to='/blogs'>Blogs</Link>
        <Link to='/users'>Users</Link>
      </div>
    </div>
  )
}

export default Navbar
