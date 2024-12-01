const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const moongoose = require('mongoose')
moongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ', MONGODB_URI)

moongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDb'))
  .catch((error) => console.log('error connection to MongoDB:', error))

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

/*
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

const typeDefs = `
  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Book {
    title: String!,
    published: Int!,  
    author: Author!,
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!,
    bookCount: Int!
    born: Int
  }

  type Mutation{
    addBook(
    title: String!,
    author: String!,
    published: Int!,
    genres: [String!]!
    ): Book

    editAuthor(
    name: String!,
    setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: (root, args) => {
      // if (!args.author && args.genre) {
      //   return books.filter((book) => {
      //     return book.genres.find((gen) => gen === args.genre)
      //   })
      // } else if (!args.genre && args.author) {
      //   return books.filter((book) => book.author === args.author)
      // } else if (args.author && args.genre) {
      //   const author = books.filter((book) => book.author === args.author)
      //   return author.filter((book) => {
      //     return book.genres.find((gen) => gen === args.genre)
      //   })
      // } else return books

      return Book.find({})
    },

    allAuthors: () => {
      let allAuthors = []

      authors.map((author) => {
        author.bookCount = 0
        allAuthors.push(author)
      })

      books.map((book) => {
        const currAuth = allAuthors.find((auth) => auth.name === book.author)
        currAuth.bookCount += 1
      })

      return allAuthors
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          name: args.author,
          born: null,
        })
        await author.save()
      }

      const book = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres,
      })
      return book.save()
    },

    editAuthor: (root, args) => {
      let author = authors.find((auth) => auth.name === args.name)

      if (author) {
        author.born = args.setBornTo
        return author
      }

      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
