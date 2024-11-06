import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {
  notificationChange,
  notificationRemove,
} from '../reducers/notificationReducer'

const AnecdoteFrom = () => {
  const dispatch = useDispatch()

  const add = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    dispatch(addAnecdote(content))
    dispatch(notificationChange(`new anectode ${content}`))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, 5000)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteFrom
