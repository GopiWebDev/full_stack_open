// Database models
import Book from '../models/book.js'
import Author from '../models/author.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

import throwError from '../utils/errorHandler.js'

const resolvers = {
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          return throwError('not authenticated')
        }

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

    editAuthor: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          return throwError('not authenticated')
        }

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

    createUser: async (root, args) => {
      try {
        const { username, favoriteGenre } = args
        const exists = await User.findOne({ username })

        if (exists) {
          return throwError('User exists exists')
        }

        const newUser = new User({
          username,
          favoriteGenre,
        })

        await newUser.save()
        return newUser
      } catch (error) {
        throwError(error)
      }
    },
    login: async (root, args) => {
      const { username, password } = args

      const user = await User.findOne({ username })

      if (!user || password !== 'secret') {
        return throwError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      try {
        const allBooks = await Book.find({})

        const updatedBooks = await Promise.all(
          allBooks.map(async (book) => {
            const foundAuthor = await Author.findById(book.author)

            if (foundAuthor) {
              return {
                id: book._id.toString(),
                ...book.toObject(),
                author: foundAuthor || book.author,
              }
            }

            return book.toObject()
          })
        )

        return updatedBooks
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

    me: async (root, args, context) => {
      try {
        const { currentUser } = context

        if (!currentUser) {
          return throwError('not authenticated')
        }

        return {
          id: currentUser._id,
          username: currentUser.username,
          favoriteGenre: currentUser.favoriteGenre,
        }
      } catch (error) {
        return throwError(error)
      }
    },
  },
}

export default resolvers
