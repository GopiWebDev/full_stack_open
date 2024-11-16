import { Link } from 'react-router-dom'
import accountIcon from '../assets/icons/account.svg'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'

const Navbar = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  return (
    <nav className='relative text-white bg-white shadow dark:bg-gray-800'>
      <div className='px-6 py-4 mx-auto flex justify-between items-center max-w-[750px]'>
        <h1 className='font-Inter_900  text-[clamp(1rem,0.7142857142857143rem+1.4285714285714286vw,1.5rem)]'>
          BLOGLINKS
        </h1>
        <div className='flex justify-around w-[50%] text-[clamp(0.50rem,0.5357142857142857rem+1.0714285714285714vw,1.25rem)] font-Inter_500'>
          <Link to='/'>HOME</Link>
          <Link to='/blogs'>BLOGS</Link>
          <Link to='/users'>USERS</Link>
        </div>
        <div className='w-[25px] h-[25px] md:w-[40px] md:h-[40px] lg:w-[40px] lg:h-[40px] overflow-hidden'>
          {user ? (
            <div
              onClick={() => {
                dispatch(removeUser())
              }}
              className='w-full h-full bg-green-700 font-Inter_700 flex items-center justify-center rounded-[50%] cursor-pointer'
            >
              <p className='text-[clamp(0.75rem,0.5357142857142857rem+1.0714285714285714vw,1.5rem)]'>
                {user.username[0].toUpperCase()}
              </p>
            </div>
          ) : (
            <img
              className='w-[25px] lg:w-[40px]'
              src={accountIcon}
              alt='account '
            />
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
