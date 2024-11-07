import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const createNew = (newAnecdote) => {
  if (newAnecdote.content.length < 5) return
  axios.post(baseUrl, newAnecdote)
}
