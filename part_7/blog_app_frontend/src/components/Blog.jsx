import { addMessage, clearNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(blog?.comments || [])

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (blog) {
      setComments(blog.comments || [])
    }
  }, [blog])

  const handleLike = async (blog) => {
    try {
      // update it
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const response = await blogService.update(updatedBlog)
      // get the new version and set it
      dispatch(likeBlog(response))
    } catch (error) {
      console.log(error)

      dispatch(addMessage({ content: 'Failed to update likes', error: true }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    try {
      const confirm = window.confirm(`Remove blog ${blog.title}`)
      if (confirm) {
        await blogService.deleteBlog(blog)
        dispatch(deleteBlog(blog.id))
        navigate('/')
        dispatch(addMessage({ content: 'removed successfully' }))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      } else return
    } catch (error) {
      dispatch(addMessage({ content: 'failed to remove blog', error: true }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const postComment = async (id, comment) => {
    await blogService.addComment(id, comment)
    const updatedBlog = await blogService.getBlogById(id)
    setComments(updatedBlog.comments)
  }

  const submitComment = async (e) => {
    e.preventDefault()

    const addedComment = await postComment(blog.id, comment)
    setComments([...comments, addedComment])
    setComment('')
  }

  if (!blog)
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

  return (
    <div className='flex flex-col max-w-md mx-auto mt-10 w-full p-4 border rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700'>
      <h2 className='mb-2 text-gray-400 text-xl font-semibold'>{blog.title}</h2>
      <a
        href={blog.url}
        className='border-t border-slate-200 font-medium text-blue-600 dark:text-blue-500 hover:underline'
      >
        Read More
      </a>
      <div>
        <span
          className='mb-2 text-gray-400 text-xl font-semibold'
          data-testid='likeDiv'
        >
          Likes: {blog.likes}
        </span>
        <button
          className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          data-testid='like'
          onClick={() => handleLike(blog)}
        >
          Like
        </button>
      </div>
      <span>added by {blog.author}</span>

      <div>
        {blog?.user?.username === user.username && (
          <button data-testid='delete' onClick={() => handleDelete(blog)}>
            delete
          </button>
        )}
      </div>
      <form onSubmit={submitComment}>
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>Add comment</button>
      </form>
      <div>
        <h3>Comments</h3>
        <ul>
          {comments &&
            comments.map((comment) => {
              return <li key={comment}>{comment}</li>
            })}
        </ul>
      </div>
    </div>
  )
}

export default Blog
