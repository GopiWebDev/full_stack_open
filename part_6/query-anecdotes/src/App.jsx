import { useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, update } from './requests'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      state = `anecdote ${action.anecdote.content} voted`
      return state
    case 'ADD':
      return (state = `anecdote ${action.content} has been added`)
    case 'CLEAR':
      return (state = '')
    case 'ERROR':
      return (state = action.err)
    default:
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) =>
        oldData.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )
    },
  })

  const handleVote = (anecdote) => {
    anecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateMutation.mutate(anecdote)
    notificationDispatch({
      type: 'VOTE',
      anecdote,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service is not available</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        {notification && <Notification />}
        <AnecdoteForm />

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
    </NotificationContext.Provider>
  )
}

export default App
