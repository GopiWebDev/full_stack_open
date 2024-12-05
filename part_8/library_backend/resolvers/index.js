// Database models
import Book from '../models/book.js'
import Author from '../models/author.js'

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
        console.log('Error saving book', error)
      }
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
