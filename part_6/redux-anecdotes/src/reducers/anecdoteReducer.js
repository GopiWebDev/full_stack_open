import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      return state.map((an) =>
        an.id === id ? { ...an, votes: an.votes + 1 } : an
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdote, vote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteServices.vote(updatedAnecdote)
    dispatch({ type: 'VOTE', payload: updatedAnecdote.id })
  }
}

export default anecdoteSlice.reducer
