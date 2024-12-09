import { ApolloServer } from '@apollo/server'
import dotenv from 'dotenv'

import connectDB from './DB/connectDB.js'
import typeDefs from './typeDefs/index.js'
import resolvers from './resolvers/index.js'

import User from './models/user.js'
import jwt from 'jsonwebtoken'
import throwError from './utils/errorHandler.js'

import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import cors from 'cors'
import http from 'http'

import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

dotenv.config()

connectDB()

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
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
    })
  )

  const PORT = process.env.PORT || 4000

  httpServer.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}

start()
