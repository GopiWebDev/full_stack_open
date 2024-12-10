// Database models
import Book from '../models/book.js'
import Author from '../models/author.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

import throwError from '../utils/errorHandler.js'

import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

const resolvers = {
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      console.log('Received args', args)

      try {
        if (!currentUser) {
          throwError('Not authenticated', {
            code: 'UNAUTHENTICATED',
          })
        }

        const { title, published, genres } = args

        if (!title || !args.author || !published || !genres) {
          throwError('Missing required fields', {
            code: 'BAD_USER_INPUT',
            invalidArgs: { title, published, genres, author: authorInput },
          })
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

        const populatedBook = await Book.findById(newBook._id).populate(
          'author'
        )

        if (!populatedBook.author.bookCount) {
          populatedBook.author.bookCount = 1
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

        return populatedBook
      } catch (error) {
        throwError('Failed to save author', {
          code: 'INTERNAL_SERVER_ERROR',
          error,
        })
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          throwError('not authenticated')
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
        // Fetch all books
        const allBooks = await Book.find({})
        console.log(allBooks)

        // Map books to include author details and calculate book counts
        const updatedBooks = await Promise.all(
          allBooks.map(async (book) => {
            const foundAuthor = await Author.findById(book.author)
            const bookData = {
              id: book._id.toString(),
              ...book.toObject(),
              author: foundAuthor ? foundAuthor.toObject() : book.author,
            }

            if (foundAuthor) {
              const bookCount = allBooks.filter(
                (b) => b.author.toString() === foundAuthor._id.toString()
              ).length

              bookData.author = { ...bookData.author, bookCount }
            }

            return bookData
          })
        )

        // Filter logic based on arguments
        const filterByAuthor = (book) =>
          !args.author || book.author?.name === args.author

        const filterByGenre = (book) =>
          !args.genre || book.genres.includes(args.genre)

        const filteredBooks = updatedBooks.filter(
          (book) => filterByAuthor(book) && filterByGenre(book)
        )

        return filteredBooks
      } catch (error) {
        console.error('Failed to get books', error)
        throw new Error('Error fetching books')
      }
    },

    allAuthors: async () => {
      try {
        const authorsWithBookCount = await Author.aggregate([
          {
            $lookup: {
              from: 'books',
              localField: '_id',
              foreignField: 'author',
              as: 'books',
            },
          },
          {
            $project: {
              name: 1,
              bookCount: { $size: '$books' },
            },
          },
        ])

        return authorsWithBookCount
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

export default resolvers
