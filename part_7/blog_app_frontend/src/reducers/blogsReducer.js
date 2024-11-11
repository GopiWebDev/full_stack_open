import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    likeBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, addBlog, likeBlog, deleteBlog } = blogReducer.actions
export default blogReducer.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
