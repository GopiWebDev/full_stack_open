import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state) {
      window.localStorage.removeItem('loggedNoteappUser')
      return (state = null)
    },
  },
})

export const { setUser, removeUser } = userReducer.actions
export default userReducer.reducer

export const initializeUser = () => {
  return async (dispatch) => {
    const storedUser = window.localStorage.getItem('loggedNoteappUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}
