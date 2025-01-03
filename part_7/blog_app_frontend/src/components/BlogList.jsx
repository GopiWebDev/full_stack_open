import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  if (blogs.length <= 0) {
    return (
      <div className='flex justify-center max-w-md mx-auto mt-10 w-full p-4 border rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700 divide-y divide-gray-700'>
        <Oval
          className='mx-auto'
          visible={true}
          height='80'
          width='80'
          color='#4fa94d'
          ariaLabel='oval-loading'
          wrapperStyle={{}}
          wrapperClass=''
        />
      </div>
    )
  }

  return (
    <div className='flex flex-col max-w-md mx-auto mt-10 w-full p-4 border rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700'>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className='text-gray-400 flex justify-between px-5 my-2 text-[clamp(0.50rem,0.5357142857142857rem+1.0714285714285714vw,1rem)]'
        >
          {blog.title}
          <Link
            className='inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline'
            to={`/blogs/${blog.id}`}
          >
            Know More
            <svg
              className='w-4 h-4 ms-2 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
