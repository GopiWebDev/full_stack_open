import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: { content: '', error: false },
  reducers: {
    addMessage(state, action) {
      state = action.payload
      return state
    },
    clearNotification(state) {
      return (state = '')
    },
  },
})

export const { addMessage, clearNotification } = notificationReducer.actions
export default notificationReducer.reducer
