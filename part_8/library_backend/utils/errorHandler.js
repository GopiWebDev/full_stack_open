import { GraphQLError } from 'graphql'

function throwError(error) {
  throw new GraphQLError(error)
}

export default throwError
