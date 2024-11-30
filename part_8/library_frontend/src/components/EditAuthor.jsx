import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../../queries'
import Select from 'react-select'

const EditAuthor = () => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const authors = []

  const result = useQuery(ALL_AUTHORS)
  result &&
    result.data.allAuthors.map((author) => {
      authors.push({ value: author.name, label: author.name })
    })

  const submit = (e) => {
    e.preventDefault()

    editAuthor({ variables: { name: name.value, setBornTo: parseInt(born) } })

    setName(null)
    setBorn('')
  }

  return (
    <form action='' onSubmit={submit}>
      <h2>Set Birth Year</h2>
      <div style={{ color: 'black' }}>
        <Select defaultValue={name} options={authors} onChange={setName} />
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
