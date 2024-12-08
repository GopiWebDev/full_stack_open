import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router } from 'react-router-dom'

const logLink = new ApolloLink((operation, forward) => {
  return forward(operation)
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  fetchOptions: { mode: 'cors' },
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logLink.concat(authLink.concat(httpLink)),
  connectToDevTools: true,
})

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
