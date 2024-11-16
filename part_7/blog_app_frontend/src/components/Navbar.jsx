import { Link } from 'react-router-dom'
import accountIcon from '../assets/icons/account.svg'

const Navbar = () => {
  return (
    <nav className='relative text-white bg-white shadow dark:bg-gray-800'>
      <div className='wrapper px-6 py-4 mx-auto flex justify-between items-center'>
        <h1 className='font-Inter_900  text-[clamp(1rem,0.7142857142857143rem+1.4285714285714286vw,2rem)]'>
          BLOGLINKS
        </h1>
        <div className='flex justify-around w-[40%] text-[clamp(0.75rem,0.5357142857142857rem+1.0714285714285714vw,1.5rem)] font-Inter_500'>
          <Link to='/blogs'>BLOGS</Link>
          <Link to='/users'>USERS</Link>
        </div>
        <img
          className='w-[25px] md:w-[35px] lg:w-[40px]'
          src={accountIcon}
          alt='account '
        />
      </div>
    </nav>
  )
}

export default Navbar
