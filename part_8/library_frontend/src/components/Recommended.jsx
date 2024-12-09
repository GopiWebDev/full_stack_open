import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../../queries'

const Recommended = ({ setError }) => {
  const { data, loading } = useQuery(ALL_BOOKS)

  const me = useQuery(ME)

  let fav = ''

  if (me.loading) {
    return <div>Loading...</div>
  } else {
    fav = me.data.me.favoriteGenre
  }

  let books = []

  if (loading) {
    return <div>Loading....</div>
  } else {
    books = data.allBooks
  }

  books = books.filter((book) => {
    if (book.genres.find((gen) => gen === fav)) {
      return book
    }
  })

  if (!books.length) {
    setError('No books matching your genre')
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <strong>{fav}</strong>
      </p>

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
    </div>
  )
}

export default Recommended
