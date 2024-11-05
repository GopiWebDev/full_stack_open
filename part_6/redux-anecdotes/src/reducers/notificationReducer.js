import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { notificationChange } = notificationReducer.actions
export default notificationReducer.reducer
