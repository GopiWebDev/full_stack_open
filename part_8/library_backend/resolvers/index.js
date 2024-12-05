// Database models
import Book from '../models/book.js'
import Author from '../models/author.js'

const resolvers = {
  Mutation: {
    addBook: async (root, args) => {
      let author = Author.findOne({ name: args.author })

      if (!author) {
        console.log('Author not found creating one')

        author = new Author({
          name: args.author,
          born: null,
        })
        await author.save()
        console.log('New author saved:', author)
      } else {
        console.log('Author found', author)
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
}

export default resolvers
