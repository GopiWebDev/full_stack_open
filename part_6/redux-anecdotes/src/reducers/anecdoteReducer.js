import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find((an) => an.id === id)
      anecdote.votes++
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
  },
})

export default anecdoteSlice.reducer
export const { vote, addAnecdote, appendAnecdote, setAnecdote } =
  anecdoteSlice.actions
