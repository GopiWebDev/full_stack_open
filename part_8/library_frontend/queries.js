import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS }
