import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
        born
      }
      id
    }
  }
`

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: authorInput!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const ME = gql`
  query {
    me {
      favoriteGenre
      username
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR, LOGIN, ME }
