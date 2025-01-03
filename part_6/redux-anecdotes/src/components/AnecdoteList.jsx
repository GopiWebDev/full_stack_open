import { useDispatch, useSelector } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import {
  notificationChange,
  notificationRemove,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const handleVote = async (anecdote) => {
    await dispatch(updateVote(anecdote))
    dispatch(notificationChange(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
