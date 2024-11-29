import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../../queries'

const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (e) => {
    e.preventDefault()

    editAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <form action='' onSubmit={submit}>
      <h2>Set Birth Year</h2>
      <div>
        name
        <input
          type='text'
          value={name}
          onChange={({ target }) => setName(target.value)}
          required
        />
      </div>
      <div>
        born
        <input
          type='number'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
          required
        />
      </div>
      <button type='submit'>update author</button>
    </form>
  )
}

export default EditAuthor
