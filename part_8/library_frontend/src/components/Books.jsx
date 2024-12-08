import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../../queries'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState('')
  const { data, loading } = useQuery(ALL_BOOKS)

  let books = []

  if (loading) {
    return <div>Loading....</div>
  } else {
    books = data.allBooks
  }

  const genres = {}

  books?.map((book) => {
    book?.genres?.map((ge) => {
      genres[ge] = 1 + (genres[ge] || 0)
    })
  })

  const filterByGenre = (genreInput, books) => {
    if (!genreInput) return books

    const bookArray = books.filter((book) => {
      if (book.genres.find((gen) => gen === genreInput)) {
        return book
      }
    })

    return bookArray
  }

  books = filterByGenre(genre, books)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>In genre {genre}</h2>
        {genres &&
          Object.keys(genres).map((genre) => {
            return (
              <button key={genre} onClick={() => setGenre(genre)}>
                {genre}
              </button>
            )
          })}
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
