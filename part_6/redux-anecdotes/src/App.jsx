import AnecdoteFrom from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/FIlter'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'

const App = () => {
  const notification = useSelector((state) => state.notification)

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
