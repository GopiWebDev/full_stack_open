import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import dotenv from 'dotenv'

import connectDB from './DB/connectDB.js'
import typeDefs from './typeDefs/index.js'
import resolvers from './resolvers/index.js'

import User from './models/user.js'
import jwt from 'jsonwebtoken'
import throwError from './utils/errorHandler.js'

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

connectDB()

const corsOptions = {
  origin: 'http://localhost:5173',
}

startStandaloneServer(server, {
  listen: { port: 4000 },
  cors: corsOptions,
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.startsWith('Bearer ')) {
      try {
        const token = auth.substring(7)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)

        return { currentUser }
      } catch (error) {
        throwError(error)
      }
    }
    return { currentUser: null }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
