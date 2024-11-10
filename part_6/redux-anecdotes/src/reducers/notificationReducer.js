import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      state = action.payload.content
      return state
    },
    notificationRemove(state) {
      state = ''
      return state
    },
  },
})

export const { notificationChange, notificationRemove } =
  notificationReducer.actions

export default notificationReducer.reducer
