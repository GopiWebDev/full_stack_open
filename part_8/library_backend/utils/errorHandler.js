import { GraphQLError } from 'graphql'

function throwError(message, details = {}) {
  throw new GraphQLError(message, {
    extensions: {
      code: details.code || 'INTERNAL_SERVER_ERROR',
      invalidArgs: details.invalidArgs || null,
      error: details.error || null,
    },
  })
}

export default throwError
