// Database models
import Book from '../models/book.js'
import Author from '../models/author.js'
import throwError from '../utils/errorHandler.js'

const resolvers = {
  Mutation: {
    addBook: async (root, args) => {
      try {
        const { name } = args.author
        let author = await Author.findOne({ name })

        if (!author) {
          console.log('Author not found creating one')
          const newAuthor = new Author({
            name: name,
            born: null,
          })

          await newAuthor.save()
          console.log('New author saved:', newAuthor)
        }

        author = await Author.findOne({ name })

        const newBook = new Book({
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres,
        })

        await newBook.save()
        return newBook
      } catch (error) {
        return throwError(error)
      }
    },

    editAuthor: async (root, args) => {
      try {
        let update = { name: args.name, born: args.setBornTo }

        const author = await Author.findOne({ name: args.name })

        if (author) {
          const updatedAuthor = await Author.findByIdAndUpdate(
            author._id,
            update,
            { new: true }
          )

          return updatedAuthor
        }
      } catch (error) {
        return throwError(error)
      }
    },
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      try {
        const allBooks = await Book.find({})
        return allBooks
      } catch (error) {
        console.log('Failed to get books', error)
      }
    },

    allAuthors: async () => {
      try {
        const allAuthors = await Author.find({})
        return allAuthors
      } catch (error) {
        console.log('Failed to fetch authors', error)
      }
    },
  },
}

export default resolvers
