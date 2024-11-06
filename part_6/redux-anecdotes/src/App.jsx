import { useEffect } from 'react'
import AnecdoteFrom from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/FIlter'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'
import anecdoteServices from './services/anecdotes'
import { setAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const notification = useSelector((state) => state.notification)

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteServices
      .getAll()
      .then((anecdotes) => dispatch(setAnecdote(anecdotes)))
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteFrom />
    </div>
  )
}

export default App
