import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import dotenv from 'dotenv'

import connectDB from './DB/connectDB.js'
import typeDefs from './typeDefs/index.js'
import resolvers from './resolvers/index.js'

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

connectDB()

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
